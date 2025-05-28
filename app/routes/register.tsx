import { useNavigate } from "@remix-run/react";
import React from "react";
import { toast } from "sonner";
import Time from "../components/Time";

const FACULTY = {
	SICT: ["IFT", "CSC", "CYB", "SOE"],
	// SAAT: ["FWT", "AEC", "AEX", "ANT", "CST", "FAT", "SST"],
	// SESET: ["CME", "EPE", "ELE", "MCE", "TCE", "EEE"],
	OTHERS: ["others"],
};

export default function Page() {
	const [departments, setDepartments] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(false);

	const navigate = useNavigate();

	async function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
		ev.preventDefault();
		setIsLoading(true);
		const form = ev.currentTarget;

		console.log(new FormData(form).entries());

		const res = await (
			await fetch("/api/register", {
				method: "post",
				body: new FormData(form),
			})
		).json();

		setIsLoading(false);

		if (!res.ok) return toast.error(res.message, { style: { color: "red" } });
		toast.success(res.message, { style: { color: "blue" } });

		navigate("/");
	}

	return (
		<main>
			<div className="reg-wrapper">
				<div style={{ flex: 1 }}>
					<h2 className="title" style={{ marginTop: 10 }}>
						Register And Secure <br /> Your Spot Today
					</h2>
					<p className="text">
						Don't miss your chance to be part of shaping the future of food.
						Reserve your spot now and embark on a journey of discovery,
						collaboration and inspiration
					</p>
					<p className="time-card-wrapper-flex">
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
							<span className="time-card-text">
								Cyber Security Research Center, FUTO
							</span>
						</span>
					</p>
				</div>
				<div className="reg-form" style={{ flex: 1 }}>
					<form onSubmit={onSubmit}>
						<div className="input-pair">
							<input name="email" type="email" placeholder="Email" required />
							<input
								name="first_name"
								type="text"
								placeholder="First Name"
								required
							/>
						</div>
						<div className="input-pair">
							<input
								name="middle_name"
								type="text"
								placeholder="Middle name (optional)"
							/>
							<input
								name="last_name"
								type="text"
								placeholder="Last Name"
								required
							/>
						</div>
						<div className="input-pair">
							<input
								name="phone_number"
								type="tel"
								placeholder="Phone Number"
								maxLength={15}
								minLength={10}
								required
							/>

							<select name="role" id="dez-sel" required>
								<option value="" disabled selected>
									Designation
								</option>
								{[
									{ value: "staff", lable: "Staff" },
									{ value: "postgraduate", lable: "Postgraduate Student" },
									{ value: "undergraduate", lable: "Undergraduate Student" },
								].map(({ lable, value }) => (
									<option value={value} key={value}>
										{lable}
									</option>
								))}
							</select>
						</div>
						<select
							style={{ marginBottom: 10 }}
							name="school"
							id="faculty-sel"
							required
							//@ts-expect-error
							onChange={(ev) => setDepartments(FACULTY[ev.currentTarget.value])}
						>
							<option value="" disabled selected>
								School
							</option>
							{Object.keys(FACULTY).map((value) => (
								<option value={value} key={value}>
									{value}
								</option>
							))}
						</select>
						<select
							style={{ marginBottom: 10 }}
							name="department"
							id="dept-sel"
							required
						>
							<option value="" disabled selected>
								Department
							</option>
							{departments.map((value) => (
								<option value={value} key={value}>
									{value}
								</option>
							))}
						</select>
						<select
							style={{ marginBottom: 10 }}
							name="level"
							id="level-sel"
							required
						>
							<option value="null" disabled selected>
								Level
							</option>
							{[
								{ value: "100", lable: "100 Level" },
								{ value: "200", lable: "200 Level" },
								{ value: "300", lable: "300 Level" },
								{ value: "400", lable: "400 Level" },
								{ value: "500", lable: "500 Level" },
								{ value: "others", lable: "Others" },
							].map(({ lable, value }) => (
								<option value={value} key={value}>
									{lable}
								</option>
							))}
						</select>
						<button
							id="submit"
							className="primary-btn"
							style={{ width: "100%", paddingBlock: 20 }}
						>
							{isLoading ? <>Please wait...</> : <>Register Now</>}
						</button>
					</form>
				</div>
			</div>
		</main>
	);
}
