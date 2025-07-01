import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

// Initialize the Google Generative AI client
const genAI = new GoogleGenAI(process.env.GOOGLE_API_KEY);

const getSystemPrompt = () => `
  You are a content creation assistant for a CMS called Storyblok.
  Your task is to take a user's prompt and generate a structured JSON object representing a webpage.
  The JSON object must follow this exact schema:
  {
    "title": "String - The title of the page",
    "meta_description": "String - A short, SEO-friendly description of the page",
    "hero_section": {
      "headline": "String - A catchy headline for the hero section",
      "subheadline": "String - A compelling subheadline to draw users in"
    },
    "body_sections": [
      {
        "type": "text-block",
        "content": "String - A paragraph of text content."
      },
      {
        "type": "text-with-image",
        "text": "String - Text that will appear next to an image.",
        "image_prompt": "String - A descriptive prompt for an AI to generate a relevant image (e.g., 'a serene mountain landscape at sunrise')."
      }
    ]
  }

  - You must only return the raw JSON object, without any markdown formatting, backticks, or other text.
  - The 'body_sections' array should contain a mix of 'text-block' and 'text-with-image' components based on the user's prompt.
  - Generate content that is creative and relevant to the user's prompt.
`;

export async function POST(request) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const fullPrompt = `${getSystemPrompt()}\n\nUser Prompt: "${prompt}"`;

    // Generate content with Gemini using the new SDK
    const response = await genAI.models.generateContent({
      model: "gemini-1.5-flash",
      contents: fullPrompt,
    });

    const text = response.text;

    // Attempt to parse the AI-generated text as JSON
    try {
      const jsonResponse = JSON.parse(text);
      return NextResponse.json(jsonResponse);
    } catch (e) {
      console.error("Failed to parse JSON from AI response:", text);
      return NextResponse.json(
        { error: "AI returned invalid JSON format." },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error generating content:", error);
    return NextResponse.json(
      { error: "Failed to generate content" },
      { status: 500 }
    );
  }
}
