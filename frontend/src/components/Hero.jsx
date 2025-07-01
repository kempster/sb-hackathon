export default function Hero({ blok }) {
return (
	<div className="bg-gray-200 flex items-center text-center py-20">
		<div className="mx-auto max-w-7xl p-5 space-y-5">
			<h1 className="font-bold text-5xl">{blok.headline}</h1>
			<div>{blok.text}</div>
		</div>
	</div>
);
}