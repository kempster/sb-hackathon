import { apiPlugin, storyblokInit } from '@storyblok/react/rsc';
import Page from "@/components/Page";
import Hero from "@/components/Hero";

export const getStoryblokApi = storyblokInit({
accessToken: process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN,
use: [apiPlugin],
components: {
  page: Page,
  hero: Hero
},
apiOptions: {
	region: 'eu',
},
});