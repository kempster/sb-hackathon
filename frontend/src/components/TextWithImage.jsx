import { render } from "storyblok-rich-text-react-renderer";
import Image from "next/image"

export default function TextWithImage({ blok }) {

  console.log(blok.image.filename)

return (
<<<<<<< Updated upstream
	<div className="container mb-10 grid grid-cols-3 gap-10">
    <div className="aspect-square bg-gray-200 flex items-center justify-center">
      {blok.image &&
        <img
          src={`https://${blok.image.filename}`}
          width="500"
          height="500"
          alt={blok.image.alt}
        />
      }
    </div>
		<div className="col-span-2 text">
=======
	<div className="container mb-5 flex gap-5">
    {blok.image &&
      <div className="w-1/2 aspect-square bg-gray-200 flex items-center justify-center">
        <img
          src={`https://${blok.image.filename}`}
          width="500"
          height="500"
          alt={blok.image.alt}
        />
      </div>
    }
		<div className="col-span-2 text flex-1">
>>>>>>> Stashed changes
      {render(blok.text)}
    </div>
	</div>
);
}