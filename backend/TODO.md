# Todo List - Storyblok AI Page Generator

This file outlines the tasks required to build the Storyblok AI page generator plugin.

## 1. Project Setup & Configuration

- [x] Initialize Next.js project (Completed)
- [x] Install necessary dependencies (`@storyblok/react`, `@google/generative-ai`, `storyblok-js-client`)
- [x] Configure environment variables for Storyblok and AI service API keys.
- [ ] Set up Storyblok plugin configuration.

## 2. Backend Development (API Routes / Server Actions)

- [x] Create an API route to handle the prompt from the frontend.
- [x] Integrate with Google AI API for text content generation.
  - [x] Define a clear schema for the AI to return structured content.
- [x] Integrate with an image generation API (Google Imagen).
- [x] Create an API route to create the page in Storyblok.
  - [x] Authenticate with the Storyblok Management API (OAuth Token).
  - [x] Upload generated images to Storyblok Assets.
  - [x] Create a new Story with the generated content.

## 3. Frontend Development (Plugin UI)

- [x] Create the main plugin interface.
- [x] Build the prompt input form.
- [x] Build the content review section.
  - [ ] Display generated text content.
  - [ ] Display generated images.
- [x] Implement the "Create Page" button and its interaction with the backend.
- [ ] Implement OAuth flow to connect to Storyblok from the plugin UI. (Note: Using static token for now)

## 4. Storyblok Schema

- [x] Define the Storyblok components and field types that the AI will generate (e.g., `page`, `hero`, `text_with_image`, `gallery`).
- [x] Ensure the backend can map the AI's output to this defined schema.

## 5. Deployment & Finalization

- [ ] Deploy the Next.js application to a public URL (e.g., Vercel, Netlify).
- [ ] Register the deployed application as a Tool Plugin in Storyblok.
- [x] Write clear documentation in `README.md` on how to set up and use the plugin.
- [x] Update `CHANGELOG.md` with all significant changes.
- [x] Update `STRUCTURE.md` to reflect the final project structure.
