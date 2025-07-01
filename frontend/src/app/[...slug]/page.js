import { StoryblokStory } from '@storyblok/react/rsc';
import { getStoryblokApi } from '@/lib/storyblok';

export default async function Page({ params }) {
const { slug } = await params;

const fullSlug = slug ? slug.join('/') : 'home';

const storyblokApi = getStoryblokApi();
let { data } = await storyblokApi.get(`cdn/stories/${fullSlug}`, {
	version: 'draft',
});

console.log(data)

return (
		<>
			<div className="container mb-10">
	      <h1 className="font-bold text-4xl mb-5">{data.story.name}</h1>
			</div>
			<StoryblokStory story={data.story} />;
		</>
	)
}