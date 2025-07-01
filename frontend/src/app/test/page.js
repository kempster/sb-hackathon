import { getStoryblokApi } from '@/lib/storyblok';

export default async function Test() {
  const storyblokApi = getStoryblokApi();
  const data = await storyblokApi.get('cdn/stories/about', {
    version: 'draft',
  });
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}