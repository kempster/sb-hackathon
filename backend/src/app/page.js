"use client";

import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [generatedContent, setGeneratedContent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleGenerate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setGeneratedContent(null);
    setSuccessMessage("");

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "An unknown error occurred.");
      }

      setGeneratedContent(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateStory = async () => {
    if (!generatedContent) return;

    setIsCreating(true);
    setError(null);
    setSuccessMessage("");

    try {
      const response = await fetch("/api/create-story", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(generatedContent),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to create story.");
      }

      setSuccessMessage(`Successfully created story: "${result.story.name}"!`);
      setGeneratedContent(null); // Clear the preview after success
    } catch (err) {
      setError(err.message);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-12 bg-gray-50">
      <div className="w-full max-w-4xl">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-gray-800">
            AI Page Generator
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            Create stunning pages in Storyblok with a single prompt.
          </p>
        </header>

        {successMessage && (
          <div
            className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg relative"
            role="alert"
          >
            <strong className="font-bold">Success: </strong>
            <span className="block sm:inline">{successMessage}</span>
          </div>
        )}

        <div className="bg-white p-8 rounded-lg shadow-md">
          <form onSubmit={handleGenerate}>
            <div className="mb-4">
              <label
                htmlFor="prompt"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Describe the page you want to build:
              </label>
              <textarea
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                rows="5"
                placeholder="e.g., 'A vibrant landing page for a new brand of eco-friendly dog toys, featuring a hero section, product highlights, and customer testimonials.'"
                required
              />
            </div>
            <div className="flex items-center justify-end">
              <button
                type="submit"
                disabled={isLoading || !prompt}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isLoading ? "Generating..." : "Generate Content"}
              </button>
            </div>
          </form>
        </div>

        {error && (
          <div
            className="mt-8 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative"
            role="alert"
          >
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {generatedContent && (
          <div className="mt-8 bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Generated Content Preview
            </h2>
            <div className="bg-gray-900 text-white p-4 rounded-md overflow-x-auto">
              <pre>{JSON.stringify(generatedContent, null, 2)}</pre>
            </div>
            <div className="mt-6 text-right">
              <button
                onClick={handleCreateStory}
                disabled={isCreating}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-400"
              >
                {isCreating ? "Creating..." : "Create Page in Storyblok"}
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
