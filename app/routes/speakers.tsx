import React from "react";
import JoinUs from "../components/JoinUs";
import Speakers from "../components/Speakers";

export default function Page() {
	return (
		<main>
			<h1 className="text-center pt-5 text-5xl mb-10">{/* <>Speakers</> */}</h1>
			<Speakers />
			<div className="mb-20"></div>
			<JoinUs />
		</main>
	);
}
