# Storyblok AI Page Generator

This is a Next.js application that serves as a tool plugin for Storyblok. It allows users to generate entire pages, including structured content and images, from a single text prompt using Google's Generative AI.

## Features

- **AI-Powered Content Creation**: Generate a full page structure from a simple prompt (e.g., "a landing page for a new coffee brand").
- **Structured JSON Output**: The AI is prompted to return a clean, predictable JSON object that maps directly to Storyblok components.
- **Automatic Image Generation**: Automatically generates relevant images based on the content and uploads them to Storyblok.
- **One-Click Page Creation**: Users can review the generated content and create the page in Storyblok with a single button click.

## Prerequisites

Before you begin, you will need:

- A Storyblok account and a Space.
- A Google AI API Key.
- Node.js and npm installed.

## Setup & Configuration

### 1. Clone & Install Dependencies

```bash
git clone <your-repo-url>
cd backend
npm install
```

### 2. Environment Variables

Create a `.env.local` file in the root of the `backend` directory and add the following keys:

```
# Storyblok
STORYBLOK_OAUTH_TOKEN="YOUR_STORYBLOK_MANAGEMENT_API_OAUTH_TOKEN"
STORYBLOK_SPACE_ID="YOUR_STORYBLOK_SPACE_ID"

# Google AI
GOOGLE_API_KEY="YOUR_GOOGLE_AI_API_KEY"
```

- `STORYBLOK_OAUTH_TOKEN`: You can generate this from your Storyblok account under **Settings > Access Tokens**.
- `STORYBLOK_SPACE_ID`: Found in your Storyblok space settings.
- `GOOGLE_API_KEY`: You can get this from [Google AI Studio](https://aistudio.google.com/app/apikey).

### 3. Configure Storyblok Components

For the tool to work correctly, you must create the following components and fields in your Storyblok space.

**Component: `page`**

- `title`: `text`
- `meta_description`: `text`
- `hero_headline`: `text`
- `hero_subheadline`: `text`
- `body`: `blocks` (Allow `text_block` and `text_with_image` components)

**Component: `text_block`**

- `content`: `textarea`

**Component: `text_with_image`**

- `text`: `textarea`
- `image`: `asset`

## Running the Application

To start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the tool.

## How to Use

1.  Enter a descriptive prompt in the text area.
2.  Click "Generate Content".
3.  Review the JSON output in the preview section.
4.  If you are happy with the content, click "Create Page in Storyblok".
5.  The new page will be created and published in your Storyblok space.

## Deploying and Registering as a Plugin

1.  Deploy your Next.js application to a public URL using a service like Vercel or Netlify.
2.  In your Storyblok space, go to **Settings > Tool Plugins**.
3.  Click **Add Tool** and enter the name and the public URL of your deployed application. The tool will now be available in your Storyblok sidebar.
