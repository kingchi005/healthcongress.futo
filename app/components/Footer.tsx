import { Link } from "@remix-run/react";
import React from "react";

export default function Footer() {
	return (
		<footer className="bg-neutral-50">
			<div>
				<span>SICT'3RD</span>
				<div className="footer-links mt-8 md:mt-0">
					<div>
						{/* <a href="#!" className="t">Menu</a>  */}
						<Link to="/">Home</Link>
						<Link to="/speaker">Speaker</Link>
						<Link to="/schedule">Schedule</Link>
						<Link to="/contactus">Contact</Link>
						<Link to="/register">Registration</Link>
						<Link to="/admin">Admin</Link>
					</div>
					<div>
						{/* <a href="#!" className="t">Socials</a>  */}
						<Link to="https://futo.edu.ng/">FUTO</Link>
						<Link to="https://futo.edu.ng/school-of-information-and-communication-technology-sict/">
							SICT FUTO
						</Link>
						{/* <a href="">Linkedin</a>  */}
					</div>
				</div>
			</div>

			<p className="footer-base">
				<span>&copy All right reserved . SICT Symposium 2024 </span>{" "}
				<span>Terms and Conditions</span>
			</p>
		</footer>
	);
}
