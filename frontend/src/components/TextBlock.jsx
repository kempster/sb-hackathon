import { render } from "storyblok-rich-text-react-renderer";

export default function TextBlock({ blok }) {
return (
	<div className="container mb-5 text">
		<div>
      {render(blok.content)}
    </div>
	</div>
);
}