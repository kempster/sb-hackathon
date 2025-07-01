# Changelog

## [YYYY-MM-DD] - Initial Setup

- Initialized Next.js project.
- Created `TODO.md` with the initial development plan for the Storyblok AI page generator plugin.
- Created `STRUCTURE.md` to document the project structure.

## [YYYY-MM-DD] - Dependency & Direction Update

- Switched AI provider from OpenAI to Google Gemini.
- Uninstalled `openai` package and installed `@google/generative-ai`.
- Updated `TODO.md` to reflect the change in AI service.

## [YYYY-MM-DD] - Core Feature Implementation

- Created `/api/generate` route to get structured page content from Google Gemini.
- Created `/api/create-story` route to handle page creation in Storyblok.
- Integrated Google's Imagen model for text-to-image generation.
- Implemented logic to upload generated images to Storyblok Assets.
- Implemented `storyblok-js-client` to create stories with the generated content and images.
- Built the frontend UI with React for user prompts and previewing the AI-generated JSON.
- Connected the UI to the backend API routes to create a full end-to-end workflow.
