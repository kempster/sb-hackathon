import { apiPlugin, storyblokInit } from '@storyblok/react/rsc';
import Page from "@/components/Page";
import Hero from "@/components/Hero";
import TextWithImage from "@/components/TextWithImage";
import TextBlock from "@/components/TextBlock";

export const getStoryblokApi = storyblokInit({
accessToken: process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN,
use: [apiPlugin],
components: {
  page: Page,
  hero: Hero,
  'text_with_image': TextWithImage,
  'text_block': TextBlock
},
apiOptions: {
	region: 'eu',
},
});