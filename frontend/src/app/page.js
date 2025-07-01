import { getStoryblokApi } from '@/lib/storyblok';
import { StoryblokStory } from '@storyblok/react/rsc';

export default async function Home() {
  const story = await fetchData('home');

  return (
    <div className="page">
      <StoryblokStory story={story.story} />
    </div>
  );
}

async function fetchData(slug) {
  const storyblokApi = getStoryblokApi();
  return await storyblokApi.get(`cdn/stories/${slug}`, {
    version: 'draft',
  });
}
