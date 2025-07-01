import { render } from "storyblok-rich-text-react-renderer";

export default function TextWithImage({ blok }) {
return (
	<div className="container mb-10 grid grid-cols-3 gap-10">
    <div className="aspect-square bg-gray-200 flex items-center justify-center">{blok.image} Image</div>
		<div className="col-span-2 text">
      {render(blok.text)}
    </div>
	</div>
);
}