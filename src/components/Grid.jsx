import { StoryblokServerComponent } from '@storyblok/react/rsc'

export default function Grid({ blok }){
return (
	<div className="grid grid-cols-3 gap-5 mb-10">
		{blok.columns.map((nestedBlok) => (
			<div className="aspect-square bg-gray-200"> 
				<StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
			</div>
		))}
	</div>
);
};