/* eslint-disable react/no-unescaped-entities */
import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import JoinUs from "../components/JoinUs";
import Speakers from "../components/Speakers";
import Time from "../components/Time";
import { about_cards, contacts, speakers, host } from "../store";
import TimeDate from "~/components/TimeDate";

export const meta: MetaFunction = () => {
	return [
		{ title: "SICT'3RD SYMPOSIUM" },
		{ name: "description", content: "Welcome to Remix!" },
	];
};

export default function Index() {
	// console.log("client side");

	return (
		<div className="items-center justify-center">
			<section
				className="mt-0 pb-10 relative min-h-[80vh] flex items-center justify-center bg-cover bg-center bg-no-repeat"
				style={{
					backgroundImage:
						"linear-gradient(180deg,rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8)), url('/hero-image.jpg')",
				}}
			>
				<div className="mx-auto px-4 md:px-8 lg:px-16">
					<div className="text-center md:text-left max-w-3xl md:ml-0 mx-auto">
						<h1
							className="text-center md:text-left mt-10 text-5xl md:text-6xl mb-10 font-bold"
							style={{
								lineHeight: "normal",
								textTransform: "none",
							}}
						>
							<span className="text-blue-100">5th International Congress </span>
							<span className="text-blue-400">
								on Health Sciences and Technology
							</span>
						</h1>
						<p className="text text-center md:text-left mb-3 text-lg md:text-xl">
							<span className="text-neutral-100">
								LEVERAGING INDIGENOUS TECHNOLOGIES IN COMBATING EMERGING HEALTH
								ISSUES
							</span>
							<br className="hidden md:block" />
							<span className="text-neutral-100">IN A CHALLENGING ECONOMY</span>
						</p>
						<a href="https://futo.edu.ng" className="mt-5 inline-block">
							<p className="text-center md:text-left text-sm text-blue-400 underline hover:text-blue-300 transition-colors">
								Federal University of Technology, Owerri
							</p>
						</a>
						<div className="flex justify-center md:justify-start mt-8">
							<Link
								to="/register"
								className="primary-btn btn flex gap-3 items-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg transition-all transform hover:scale-105"
							>
								Register Now
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth="1.5"
									stroke="currentColor"
									className="w-6 h-6"
									style={{ width: 20 }}
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
									/>
								</svg>
							</Link>
						</div>
					</div>
				</div>
			</section>
			{/* <section className="hero">
				<img
					src="hero-picture.jpg"
					className="h-[60vh] object-cover"
					alt="Congress venue"
				/>
			</section> */}
			<section className="flyer px-5">
				<div style={{ flex: 1 }} className="text-center md:text-start">
					<h2 className="title text-center md:text-start">
						The Health Congress
					</h2>
					<p className="text md:pe-10 mb-3">
						In recent times, the burden of disease outbreak in developing
						countries is high. Most of the technologies developed and deployed
						tend not to specifically address the health problems in developing
						countries. However, developing countries are beginning to undertake
						innovative approaches to create simple and cost effective indigenous
						technologies to address their fundamental health problems.
					</p>
					<p className="text md:pe-10">
						The 5th international congress on Health Sciences and Technology
						therefore provides the platform for academics, scientists, policy
						makers, industrialists and other stakeholders to discuss innovative
						indigenous technologies for health promotion and Health Management
						in Nigeria and other developing countries.
					</p>
					<TimeDate />
				</div>

				{/* <div style={{ flex: 1, cursor: "pointer" }} className="mt-8 md:mt-0">
					<a href="/langing_page_images/flyer.png" target="_blank">
						<img
							src="/langing_page_images/flyer.png"
							style={{ width: "80%" }}
							alt="Congress flyer"
						/>
					</a>
				</div> */}
			</section>
			<section className="about mb-20 px-5">
				<h2 className="title text-center md:text-start">
					Why you should attend
				</h2>
				<div className="cards items-start">
					{about_cards.map(({ text, title, icon }, i) => (
						<div key={i} className="card mb-10 md:mb-0">
							<img src={icon} alt="speech bubble with a question" width={80} />
							<p className="card-title">{title}</p>
							<p className="text card-text text-center">{text}</p>
						</div>
					))}
				</div>
			</section>

			<Speakers />

			<section className="support px-5" style={{ marginTop: 100 }}>
				<div style={{ flex: 1 }} className="mb-8 md:mb-0">
					<div className="map-wrapper" style={{ width: "100%" }}>
						<div
							style={{
								overflow: "hidden",
								resize: "none",
								maxWidth: "100%",
								width: "100%",
								height: 350,
								borderRadius: 10,
							}}
						>
							<div
								id="gmap-canvas"
								style={{ height: "100%", width: "100%", maxWidth: "100%" }}
							>
								<iframe
									src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972.1961188420046!2d6.988760673968499!3d5.387051535327594!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10425dcf2cc47103%3A0x602ee30aff797c32!2sSchool%20of%20Health%20Technology!5e0!3m2!1sen!2sng!4v1748640336190!5m2!1sen!2sng"
									style={{ height: "100%", width: "100%", border: 0 }}
									loading="lazy"
								/>
							</div>
						</div>
					</div>
				</div>

				<div
					style={{ flex: 1, display: "flex", gap: 40, flexDirection: "column" }}
				>
					<div>
						<h2
							className="title text-center md:text-start"
							style={{ fontSize: 30, marginTop: 0 }}
						>
							For support &amp; enquiries
						</h2>
						<p className="text text-center md:text-start md:pe-10">
							Contact the Congress Secretariat for any inquiries about
							registration, accommodation, or general information about the
							congress.
						</p>
						<div style={{ justifyItems: "end" }} className="space-y-4 mt-6">
							{contacts.map(({ name, title, id }) => (
								<div
									key={id}
									className="contacts flex flex-row flex-wrap justify-between w-full"
								>
									<div className="flex items-center justify-between flex-row">
										<div
											style={{
												width: 40,
												height: 40,
												backgroundColor: "var(--stroke)",
												borderRadius: "50%",
											}}
										>
											<img src="/support.png" alt="" />
										</div>
										<div style={{ marginInlineStart: 20 }}>
											<p
												style={{
													fontSize: "medium",
													marginBottom: 10,
													color: "var(--dark-blue)",
												}}
											>
												{name}
											</p>
											<p
												style={{
													fontSize: "x-small",
													color: "var(--dark-blue)",
												}}
											>
												{title}
											</p>
										</div>
									</div>
									<div
										style={{
											display: "flex",
											justifyContent: "start",
											gap: 30,
										}}
									>
										<Link
											to={`tel:${title}`}
											className="icon-span"
											style={{ backgroundColor: "var(--light-blue-2)" }}
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 24 24"
												fill="currentColor"
												className="w-6 h-6 icon"
											>
												<path
													fillRule="evenodd"
													d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
													clipRule="evenodd"
												/>
											</svg>
										</Link>
										<a
											href="mailto:healthcongress@futo.edu.ng"
											className="icon-span"
											style={{ backgroundColor: "var(--light-blue-2)" }}
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 24 24"
												fill="currentColor"
												className="w-6 h-6 icon"
											>
												<path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
												<path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
											</svg>
										</a>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>
			<JoinUs />
		</div>
	);
}
