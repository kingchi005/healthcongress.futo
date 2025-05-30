import { useNavigate } from "@remix-run/react";
import React from "react";
import { toast } from "sonner";
import Time from "../components/Time";
import TimeDate from "~/components/TimeDate";

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
						Register to attend
					</h2>
					<p className="text">
						Join us in exploring innovative indigenous technologies for health
						promotion and Health Management in Nigeria and other developing
						countries. Connect with academics, scientists, policy makers, and
						industrialists to shape the future of healthcare.
					</p>
					<TimeDate />
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
