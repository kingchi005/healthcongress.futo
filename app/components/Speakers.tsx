import React from "react";
import { host, speakers } from "~/store";
import JoinUs from "./JoinUs";

export default function Speakers() {
	return (
		<div className="px-5">
			<h2 className="text-[color:var(--dark-blue)] text-4xl text-center font-light leading-[normal] capitalize mb-14">
				Keynote Speakers
			</h2>
			<div className="speakers-row flex-wrap md:flex-nowrap justify-center md:justify-between">
				{speakers.map((speaker, i) => (
					<SpeakerCard key={i} {...speaker} />
				))}
			</div>
			<div className="mb-20"></div>
			<h2 className="text-[color:var(--dark-blue)] text-4xl text-center font-light leading-[normal] capitalize mb-14">
				Congress Host
			</h2>
			<div className="speakers-row flex-wrap md:flex-nowrap justify-center md:items-center">
				{host.map((speaker, i) => (
					<SpeakerCard key={i} {...speaker} />
				))}
			</div>
		</div>
	);
}

interface SpeakerCardProp {
	name: string;
	photo: string;
	title: string;
}

function SpeakerCard({ name, photo, title }: SpeakerCardProp) {
	return (
		<div
			className="speaker rounded-tr-3xl rounded-bl-3xl"
			style={{ minWidth: 100 }}
		>
			<img
				src={`/${photo}`}
				alt={`${name} - ${title}`}
				width={100}
				height={100}
				style={{ minWidth: 100 }}
				className="speaker_image"
			/>
			<div className="label font-semibold">
				<p className="text-lg">{name}</p>
				<p className="text-[small] line-clamp-2 hover:line-clamp-6">{title}</p>
			</div>
		</div>
	);
}
