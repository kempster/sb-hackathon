import { NextResponse } from "next/server";
import StoryblokClient from "storyblok-js-client";
import { GoogleGenAI } from "@google/genai";
import { writeFile } from "fs/promises";
import path from "path";
import axios from "axios";
import FormData from "form-data";

// Initialize the Storyblok client
const Storyblok = new StoryblokClient({
  oauthToken: process.env.STORYBLOK_OAUTH_TOKEN,
});

// Initialize the Google Generative AI client
const genAI = new GoogleGenAI(process.env.GOOGLE_API_KEY);

// Function to generate an image and upload it to Storyblok
async function generateAndUploadImage(prompt, spaceId) {
  try {
    console.log(`Generating image for prompt: "${prompt}"`);

    // Generate image with Imagen
    const imageResponse = await genAI.models.generateImages({
      model: "imagen-4.0-generate-preview-06-06",
      prompt: prompt,
      config: {
        numberOfImages: 1,
      },
    });

    const generatedImage = imageResponse.generatedImages[0];
    if (!generatedImage) {
      throw new Error("Image generation failed.");
    }

    const imageBuffer = Buffer.from(generatedImage.image.imageBytes, "base64");
    const uniqueFilename = `ai-generated-${Date.now()}.png`;

    // Save the image locally for debugging
    const localPath = path.join(process.cwd(), "public", uniqueFilename);
    await writeFile(localPath, imageBuffer);
    console.log(`Image saved locally to: ${localPath}`);

    // --- Storyblok Upload 3-Step Process ---

    // 1. Get a signed request from Storyblok
    console.log("Step 1: Getting signed request from Storyblok...");
    const signedRequestResponse = await Storyblok.post(
      `spaces/${spaceId}/assets/`,
      {
        filename: uniqueFilename,
      }
    );
    const signedRequest = signedRequestResponse.data;

    // 2. Upload the image to Amazon S3 using the signed request
    console.log("Step 2: Uploading image to S3...");
    const form = new FormData();
    for (const key in signedRequest.fields) {
      form.append(key, signedRequest.fields[key]);
    }
    form.append("file", imageBuffer, uniqueFilename);

    await axios.post(signedRequest.post_url, form, {
      headers: form.getHeaders(),
    });

    // The asset URL is available after Step 2, but we must finalize.
    const assetUrl = signedRequest.pretty_url;

    // 3. Finalize the upload with Storyblok
    console.log("Step 3: Finalizing upload with Storyblok...");
    await Storyblok.get(
      `spaces/${spaceId}/assets/${signedRequest.id}/finish_upload`
    );

    console.log(`Image uploaded and finalized successfully: ${assetUrl}`);
    return assetUrl; // Return the final asset URL
  } catch (error) {
    console.error(
      "Error in image generation/upload process:",
      error.response ? error.response.data : error
    );
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
            image: {
              filename: imageMap[section.image_prompt] || "",
              alt: section.text,
            },
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
