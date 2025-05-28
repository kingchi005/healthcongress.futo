import { Link } from "@remix-run/react";
import React from "react";

export default function JoinUs() {
	return (
		<div className="join-us-card">
			<p style={{ color: "#ccc" }} className="mb-5 md:mb-0">
				Join us and seize the opportunities that await at the forefront of
				innovation
			</p>
			<Link to="/register" className="nav-btn">
				Register Now{" "}
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
						d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
					/>
				</svg>
			</Link>
		</div>
	);
}
