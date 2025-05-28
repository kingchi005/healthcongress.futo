import { json, useLoaderData, useRouteLoaderData } from "@remix-run/react";
import React from "react";
import { toast } from "sonner";
import { User } from "~/.server/model";
import { useAuth } from "~/store";

export default function Page() {
	const authenticated = useAuth((st) => st.authed);

	if (!authenticated) return <Login />;

	return <Participants />;
}

function Login() {
	const [isLoading, setIsLoading] = React.useState(false);
	const authenticateAdmin = useAuth((st) => st.authenticate);

	async function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
		ev.preventDefault();
		setIsLoading(true);
		const formData = new FormData(ev.currentTarget);

		const res = await (
			await fetch("/api/login", {
				method: "post",
				body: formData,
			})
		).json();
		setIsLoading(false);

		if (!res.ok) return toast.error(res.message, { style: { color: "red" } });
		toast.success(res.message, { style: { color: "blue" } });
		authenticateAdmin();
	}
	return (
		<main>
			<div className="reg-wrapper">
				<div className="reg-form">
					<h1
						className="title"
						style={{
							marginTop: 10,
							display: "flex",
							justifyContent: "start",
							fontWeight: "420",
						}}
					>
						Login as Admin
					</h1>
					<form onSubmit={onSubmit}>
						<div className="input-pair">
							<input
								name="username"
								type="text"
								placeholder="Username"
								required
							/>
						</div>
						<div className="input-pair">
							<input
								name="password"
								type="password"
								placeholder="Password"
								required
							/>
						</div>
						<button
							id="submit"
							className="primary-btn"
							style={{ width: "100%", paddingBlock: 20 }}
						>
							{isLoading ? <>Please wait...</> : <>Login</>}
						</button>
					</form>
				</div>
			</div>
		</main>
	);
}

function Participants() {
	const logout = useAuth((st) => st.logout);
	const [isLoading, setIsLoading] = React.useState(true);
	const [rows, setRows] = React.useState<User[]>([]);

	React.useEffect(() => {
		fetchParticipants();
		async function fetchParticipants() {
			// setIsLoading(true);
			const res = await (await fetch("/api/participant")).json();
			// setIsLoading(false);
			if (!res.ok) return toast.error(res.message, { style: { color: "red" } });

			// toast.success(res.message, { style: { color: "green" } });
			setRows(res.data);
		}
	}, []);

	return (
		<main>
			<h2 className="title" style={{ marginBottom: 30 }}>
				Participants
			</h2>
			<div style={{ display: "flex", justifyContent: "end" }}>
				<button
					id="logout-btn"
					onClick={logout}
					className="primary-btn text-xs"
				>
					Logout
				</button>
			</div>
			<div className="overflow-x-auto mt-5 border border-neutral-400/50 rounded-lg ">
				<table className="table text-xs">
					<thead>
						<tr>
							<th>Id</th>
							<th>Email</th>
							<th>First Name</th>
							<th>Middle Name</th>
							<th>Last Name</th>
							<th>Role</th>
							<th>Phone Number</th>
							<th>School</th>
							<th>Department</th>
							<th>Level</th>
							<th>Date</th>
						</tr>
					</thead>
					<tbody>
						{rows.map((row, i) => (
							<tr key={i}>
								<td>{i + 1}</td>
								<td>{row.email}</td>
								<td>{row.first_name}</td>
								<td>{row.middle_name}</td>
								<td>{row.last_name}</td>
								<td>{row.role}</td>
								<td>{row.phone_number}</td>
								<td>{row.school}</td>
								<td>{row.department}</td>
								<td>{row.level}</td>
								<td>{new Date(row.created_at).toLocaleDateString()}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<div className="flex justify-end mt-10">
				<a
					download
					href="/download/participant"
					id="export-btn"
					className="primary-btn flex items-center gap-5 text-sm"
				>
					Export to spreadsheet{" "}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth="2.5"
						stroke="currentColor"
						className="w-6 h-6 icon font-bold"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
						/>
					</svg>
				</a>
			</div>
		</main>
	);
}
