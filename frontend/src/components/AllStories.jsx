// app/stories/page.jsx
import { getStoryblokApi } from "@storyblok/react/rsc";

export default async function StoriesList() {
  const storyblokApi = getStoryblokApi();

  const { data } = await storyblokApi.get('cdn/stories', {
    per_page: 100,
  });

  // Filter out the story with full_slug 'home'
  const stories = data.stories.filter((story) => story.full_slug !== 'home');

  return (
    <div className="max-w-5xl mx-auto px-5">
      <h2 class="font-bold text-4xl mb-5">All Stories</h2>
      <ul className="list-disc pl-5">
        {stories.map((story) => (
          <li key={story.id}>
            <a
              href={`/${story.full_slug}`}
              className="hover:text-blue-600 hover:underline"
            >
              {story.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
