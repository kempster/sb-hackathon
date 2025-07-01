import { getStoryblokApi } from '@/lib/storyblok';
import { StoryblokStory } from '@storyblok/react/rsc';
import AllStories from '@/components/AllStories';

export default async function Home() {
const { data } = await fetchData();

return (
	<div className="page">
		<StoryblokStory story={data.story} />
		<AllStories />
	</div>
);
}

export async function fetchData() {
const storyblokApi = getStoryblokApi();
return await storyblokApi.get(`cdn/stories/home`, { version: 'draft' });
}