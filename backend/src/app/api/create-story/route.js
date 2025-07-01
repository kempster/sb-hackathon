import { NextResponse } from "next/server";
import StoryblokClient from "storyblok-js-client";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Storyblok client
const Storyblok = new StoryblokClient({
  oauthToken: process.env.STORYBLOK_OAUTH_TOKEN,
});

// Initialize the Google Generative AI client for both text and images
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const imageModel = genAI.getGenerativeModel({
  model: "imagen-3.0-generate-001",
});

// Function to generate an image and upload it to Storyblok
async function generateAndUploadImage(prompt, spaceId) {
  try {
    console.log(`Generating image for prompt: "${prompt}"`);

    // Generate image with Imagen
    const response = await imageModel.generateImages({
      prompt: prompt,
      config: {
        numberOfImages: 1,
      },
    });

    const generatedImage = response.generatedImages[0];
    if (!generatedImage) {
      throw new Error("Image generation failed to return an image.");
    }

    const imageBuffer = Buffer.from(generatedImage.image.imageBytes, "base64");
    const uniqueFilename = `ai-generated-${Date.now()}.png`;

    console.log(`Uploading image "${uniqueFilename}" to Storyblok...`);

    // Upload image to Storyblok assets
    const asset = await Storyblok.post(`spaces/${spaceId}/assets`, {
      filename: uniqueFilename,
      file: `data:image/png;base64,${imageBuffer.toString("base64")}`,
    });

    console.log("Image uploaded successfully:", asset.data.filename);
    return asset.data.filename; // Return the URL of the uploaded image
  } catch (error) {
    console.error("Error in image generation/upload process:", error);
    // Return null or a placeholder if an error occurs
    return null;
  }
}

const formatStoryblokPayload = (aiContent, imageMap) => {
  const { title, meta_description, hero_section, body_sections } = aiContent;

  // Map AI-generated sections to Storyblok component schemas
  const components = body_sections
    .map((section) => {
      switch (section.type) {
        case "text-block":
          return {
            component: "text_block", // Component name in Storyblok
            content: section.content,
          };
        case "text-with-image":
          return {
            component: "text_with_image", // Component name in Storyblok
            text: section.text,
            // Use the uploaded image URL from our map
            image: imageMap[section.image_prompt] || "",
          };
        // Add other component mappings here as needed
        default:
          return null;
      }
    })
    .filter(Boolean); // Filter out any null components

  return {
    story: {
      name: title,
      slug: title
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, ""),
      content: {
        component: "page", // The parent page component
        title: title,
        meta_description: meta_description,
        hero_headline: hero_section.headline,
        hero_subheadline: hero_section.subheadline,
        body: components, // The nested components
      },
    },
    publish: 1, // Automatically publish the story
  };
};

export async function POST(request) {
  try {
    const storyData = await request.json();
    const spaceId = process.env.STORYBLOK_SPACE_ID;

    if (!storyData || !storyData.title) {
      return NextResponse.json(
        { error: "Invalid story data provided." },
        { status: 400 }
      );
    }

    // Find all image prompts and generate/upload images in parallel
    const imagePrompts = storyData.body_sections
      .filter((s) => s.type === "text-with-image" && s.image_prompt)
      .map((s) => s.image_prompt);

    const imageUploadPromises = imagePrompts.map((prompt) =>
      generateAndUploadImage(prompt, spaceId)
    );
    const uploadedImageUrls = await Promise.all(imageUploadPromises);

    // Create a map from prompt to the final Storyblok image URL
    const imageMap = imagePrompts.reduce((acc, prompt, index) => {
      acc[prompt] = uploadedImageUrls[index];
      return acc;
    }, {});

    const payload = formatStoryblokPayload(storyData, imageMap);

    const response = await Storyblok.post(
      `spaces/${spaceId}/stories/`,
      payload
    );

    return NextResponse.json({
      message: "Story and images created successfully in Storyblok!",
      story: response.data.story,
    });
  } catch (error) {
    console.error("Error creating Storyblok story:", error);
    const errorMessage =
      error.response?.data?.message || "Failed to create story in Storyblok";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
