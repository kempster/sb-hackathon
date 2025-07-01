import { StoryblokStory } from '@storyblok/react/rsc';
import { getStoryblokApi } from '@/lib/storyblok';

export default async function Page({ params }) {
const { slug } = await params;

const fullSlug = slug ? slug.join('/') : 'home';

const storyblokApi = getStoryblokApi();
let { data } = await storyblokApi.get(`cdn/stories/${fullSlug}`, {
	version: 'draft',
});

return <StoryblokStory story={data.story} />;
}