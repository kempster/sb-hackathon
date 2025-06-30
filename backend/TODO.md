# Todo List - Storyblok AI Page Generator

This file outlines the tasks required to build the Storyblok AI page generator plugin.

## 1. Project Setup & Configuration

- [ ] Initialize Next.js project (Completed)
- [ ] Install necessary dependencies (`@storyblok/react`, AI SDK, etc.)
- [ ] Configure environment variables for Storyblok and AI service API keys.
- [ ] Set up Storyblok plugin configuration.

## 2. Backend Development (API Routes / Server Actions)

- [ ] Create an API route to handle the prompt from the frontend.
- [ ] Integrate with Google AI API for text content generation.
  - [ ] Define a clear schema for the AI to return structured content.
- [ ] Integrate with an image generation API.
- [ ] Create an API route to create the page in Storyblok.
  - [ ] Authenticate with the Storyblok Management API (OAuth).
  - [ ] Upload generated images to Storyblok Assets.
  - [ ] Create a new Story with the generated content.

## 3. Frontend Development (Plugin UI)

- [ ] Create the main plugin interface.
- [ ] Build the prompt input form.
- [ ] Build the content review section.
  - [ ] Display generated text content.
  - [ ] Display generated images.
- [ ] Implement the "Create Page" button and its interaction with the backend.
- [ ] Implement OAuth flow to connect to Storyblok from the plugin UI.

## 4. Storyblok Schema

- [ ] Define the Storyblok components and field types that the AI will generate (e.g., `page`, `hero`, `text_with_image`, `gallery`).
- [ ] Ensure the backend can map the AI's output to this defined schema.

## 5. Deployment & Finalization

- [ ] Deploy the Next.js application to a public URL (e.g., Vercel, Netlify).
- [ ] Register the deployed application as a Tool Plugin in Storyblok.
- [ ] Write clear documentation in `README.md` on how to set up and use the plugin.
- [ ] Update `CHANGELOG.md` with all significant changes.
- [ ] Update `STRUCTURE.md` to reflect the final project structure.
