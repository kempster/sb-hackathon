# Project Structure

This document outlines the directory structure for the Storyblok AI Page Generator plugin.

```
/
|-- public/
|   |-- next.svg
|   |-- vercel.svg
|   `-- ... (other static assets)
|-- src/
|   |-- app/
|   |   |-- api/
|   |   |   `-- [..all]/
|   |   |       `-- route.js  // API routes for AI integration and Storyblok API
|   |   |-- components/       // React components for the plugin UI
|   |   |-- layout.js         // Main layout for the plugin
|   |   |-- page.js           // Main page for the plugin UI
|   |   `-- globals.css
|-- .eslintrc.json
|-- .gitignore
|-- next.config.mjs
|-- package.json
|-- README.md
|-- CHANGELOG.md
|-- TODO.md
`-- STRUCTURE.md
```

## Key Directories

- **`src/app/`**: The main application folder for our Next.js app using the App Router.
  - **`src/app/api/`**: This will contain all our backend API routes. We will use this to handle requests from the frontend, communicate with the AI services, and interact with the Storyblok Management API.
  - **`src/app/components/`**: This directory will house our reusable React components that make up the plugin's user interface.
  - **`src/app/page.js`**: The entry point for our plugin's UI. This will render the main interface where the user interacts with the tool.
- **`public/`**: For static assets like images, fonts, etc.
- **`CHANGELOG.md`**: A log of all changes made to the project.
- **`TODO.md`**: A list of tasks to be completed.
- **`STRUCTURE.md`**: This file. It will be updated as the project grows.
