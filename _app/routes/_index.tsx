/* eslint-disable react/no-unescaped-entities */
import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import JoinUs from "_app/components/JoinUs";
import Speakers from "_app/components/Speakers";
import Time from "_app/components/Time";
import { about_cards, contacts, speakers, host } from "_app/store";

export const meta: MetaFunction = () => {
	return [
		{ title: "SICT'3RD SYMPOSIUM" },
		{ name: "description", content: "Welcome to Remix!" },
	];
};

export default function Index() {
	// console.log("client side");

	return (
		<main className="items-center justify-center">
			<section className="mt-0 pt-10">
				<span className="time-card" style={{ marginInline: "auto" }}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth="1.5"
						stroke="currentColor"
						className="w-6 h-6 icon"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
						/>
					</svg>
					<Time />
				</span>
				<h1
					className="text-center mt-10 text-5xl mb-10"
					style={{
						lineHeight: "normal",
						textTransform: "none",
					}}
				>
					Web Design <span>Workshop</span>
				</h1>
				<p className="text text-center mb-3">
					Join our immersive workshop and transform your ideas
					<br className="hidden md:block" />
					into stunning digital realities.
				</p>
				<a href="https://futo.edu.ng" className="mt-5">
					<p className="text-center text-sm text-blue-400 underline">
						Visit our FUTO Official website
					</p>
				</a>
				<div className="flex justify-center mt-5">
					<Link to="/register" className="primary-btn btn">
						Register Now
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth="1.5"
							stroke="currentColor"
							className="w-6 h-6 "
							style={{ width: 15 }}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
							/>
						</svg>
					</Link>
				</div>
			</section>
			<section className="hero">
				<img
					src="hero-picture.jpg"
					className="h-[60vh] object-cover"
					alt="Speaker addressing audience"
				/>
			</section>
			<section className="about mb-20">
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

			<section className="flyer">
				<div style={{ flex: 1 }} className="text-center md:text-start">
					<h2
						className="title"
						style={{ fontSize: 30, marginInline: 0, marginTop: 0 }}
					>
						Let's explore the cutting-edge <br className="hidden md:block" />
						innovations and trends
					</h2>
					<p className="text md:pe-10">
						You're invited to join us at the Web Design Workshop, where we'll
						dive into the latest in web design and development. Held at Cyber
						Security Research Center, FUTO, on May 22nd, 2024. This event
						guarantees an enriching experience. Expect vibrant discussions,
						hands-on workshops, and valuable networking.
					</p>
				</div>
				<div style={{ flex: 1, cursor: "pointer" }} className="mt-8 md:mt-0">
					<a href="/langing_page_images/flyer.png" target="_blank">
						<img
							src="/langing_page_images/flyer.png"
							style={{ width: "80%" }}
							alt="flyer"
						/>
					</a>
				</div>
			</section>

			<section className="support" style={{ marginTop: 100 }}>
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
									src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d2492.7301746346743!2d6.98836017006205!3d5.382003831553759!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1730822659275!5m2!1sen!2sus"
									style={{ height: "100%", width: "100%", border: 0 }}
									loading="lazy"
								/>
							</div>
							<style
								dangerouslySetInnerHTML={{
									__html:
										"\n#gmap-canvas img {\n  max-height: none;\n  max-width: none !important;\n  background: none !important;\n}\n            ",
								}}
							/>
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
							For support &amp; enquries
						</h2>
						<p className="text text-center md:text-start md:pe-10">
							The Web Design Workshop invites you to embark on a journey into
							the future of digital design. From the integration of cutting-edge
							design tools to mastering the latest web development techniques.
						</p>
						<p
							className="time-card-wrapper-flex"
							style={{ gap: 15, marginTop: 20 }}
						>
							<span className="time-card">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth="1.5"
									stroke="currentColor"
									className="w-6 h-6 icon"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
									/>
								</svg>
								<Time />
							</span>
							<span className="time-card">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth="1.5"
									stroke="currentColor"
									className="w-6 h-6 icon"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
									/>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
									/>
								</svg>
								<span className="text-xs">
									Cyber Security Research Center, FUTO
								</span>
							</span>
						</p>
					</div>

					<div style={{ justifyItems: "end" }} className="space-y-4">
						{contacts.slice().map(({ name, title, id }) => (
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
											style={{ fontSize: "x-small", color: "var(--dark-blue)" }}
										>
											{title}
										</p>
									</div>
								</div>
								<div
									style={{ display: "flex", justifyContent: "start", gap: 30 }}
								>
									{/* phone */}
									<Link
										to={`tel:${title}`}
										className="icon-span"
										style={{ backgroundColor: "var(--light-green-2)" }}
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
									{/* message */}
									<span
										className="icon-span"
										style={{ backgroundColor: "var(--light-green-2)" }}
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
									</span>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
			<JoinUs />
		</main>
	);
}
