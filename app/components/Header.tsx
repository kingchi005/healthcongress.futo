import { Link } from "@remix-run/react";
import React from "react";

export default function Header() {
	return (
		<>
			<header className="hidden md:flex bg-white pe-5">
				<Link
					to={"/"}
					className="logo flex flex-row items-center justify-center gap-6"
				>
					<img src="/logo.png" width={40} alt="logo" />{" "}
					<span className="font-bold text-neutral-700">SOHT</span>
				</Link>
				<nav>
					<Link to={"/"}>Home</Link>
					<Link to={"/speakers"}>Speakers</Link>
					{/* <Link to={"/schedule"}>Schedule</Link> */}
					<Link to={"/register"}>Registeration</Link>
					<Link to={"/contactus"}>Contact Us</Link>
				</nav>
				<Link to={"/register"} className="nav-btn">
					Register Now{" "}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth="1.5"
						stroke="currentColor"
						className="w-6 h-6"
						style={{ width: 15 }}
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
						/>
					</svg>
				</Link>
			</header>
			<nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50 md:hidden">
				<div className="flex justify-between items-center px-4 py-2">
					<Link to={"/"} className="text-xl font-bold">
						<span className="logo flex flex-row items-center justify-center gap-6">
							<img src="/logo.png" width={50} alt="logo" />{" "}
							<span className="font-bold text-neutral-700">SOHT</span>
						</span>
					</Link>
					<span className="flex flex-row justify-between items-center gap-8">
						{" "}
						{
							<Link
								to="/register"
								className="nav-btn px-4 py-2 text-gray-700 hover:text-gray-900 rounded"
							>
								Register Now{" "}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth="1.5"
									stroke="currentColor"
									className="w-6 h-6"
									style={{ width: 15 }}
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
									/>
								</svg>
							</Link>
						}
						<button
							id="menu-toggle"
							className="text-gray-600 focus:outline-none md:hidden"
						>
							<svg
								className="h-6 w-6"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M4 6H20M4 12H20M4 18H11V16H4Z"
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</button>
					</span>
				</div>
				<div id="mobile-menu" className="hidden md:block">
					<ul className="flex flex-col py-4 space-y-2 bg-white">
						<li>
							<Link
								to="/"
								className="px-4 py-2 text-gray-700 hover:text-gray-900 rounded"
							>
								Home
							</Link>
						</li>
						<li>
							<Link
								to="/speakers"
								className="px-4 py-2 text-gray-700 hover:text-gray-900 rounded"
							>
								Speakers
							</Link>
						</li>
						<li>
							<Link
								to="/schedule"
								className="px-4 py-2 text-gray-700 hover:text-gray-900 rounded"
							>
								Schedule
							</Link>
						</li>
						<li>
							<Link
								to="/register"
								className="px-4 py-2 text-gray-700 hover:text-gray-900 rounded"
							>
								Registeration
							</Link>
						</li>
						<li>
							<Link
								to="/contactus"
								className="px-4 py-2 text-gray-700 hover:text-gray-900 rounded"
							>
								Contact Us
							</Link>
						</li>
					</ul>
				</div>
			</nav>
		</>
	);
}
