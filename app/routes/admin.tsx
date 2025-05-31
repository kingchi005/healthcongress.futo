import { json, useLoaderData, useRouteLoaderData } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";
import React from "react";
import { User } from "~/.server/model";
import { useAuth } from "~/store";
import { db } from "~/.server/config";
import { Participant } from "@prisma/client";

export const loader: LoaderFunction = async () => {
	try {
		const data = await User.findMany();
		return json({
			ok: true,
			message: "Fetched",
			data,
		});
	} catch (error) {
		return json(
			{
				ok: false,
				message: "Failed to fetch participants",
			},
			{ status: 500 }
		);
	}
};

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

		try {
			const res = await (
				await fetch("/api/login", {
					method: "post",
					body: formData,
				})
			).json();

			if (!res?.ok) {
				alert(res.message);
				return;
			}

			alert(res.message);
			authenticateAdmin();
		} catch (error) {
			alert("An error occurred during login");
		} finally {
			setIsLoading(false);
		}
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
	const { data: initialData } = useLoaderData<{ data: Participant[] }>();
	const [searchTerm, setSearchTerm] = React.useState("");
	const [sortConfig, setSortConfig] = React.useState<{
		key: keyof Participant;
		direction: "asc" | "desc";
	} | null>(null);

	const filteredRows = React.useMemo(() => {
		return initialData.filter((row) =>
			Object.values(row).some((value) =>
				String(value).toLowerCase().includes(searchTerm.toLowerCase())
			)
		);
	}, [initialData, searchTerm]);

	const sortedRows = React.useMemo(() => {
		if (!sortConfig) return filteredRows;

		return [...filteredRows].sort((a, b) => {
			if (a[sortConfig.key] < b[sortConfig.key]) {
				return sortConfig.direction === "asc" ? -1 : 1;
			}
			if (a[sortConfig.key] > b[sortConfig.key]) {
				return sortConfig.direction === "asc" ? 1 : -1;
			}
			return 0;
		});
	}, [filteredRows, sortConfig]);

	function requestSort(key: keyof Participant) {
		setSortConfig((current) => ({
			key,
			direction:
				current?.key === key && current.direction === "asc" ? "desc" : "asc",
		}));
	}

	return (
		<main className="p-6">
			<div className="flex justify-between items-center mb-8">
				<h2 className="text-2xl font-semibold text-gray-800">Participants</h2>
				<div className="flex gap-4">
					<div className="relative">
						<input
							type="text"
							placeholder="Search participants..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
						<svg
							className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
							/>
						</svg>
					</div>
					<button
						onClick={logout}
						className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
					>
						Logout
					</button>
				</div>
			</div>

			<div className="bg-white rounded-lg shadow-lg overflow-hidden">
				<div className="overflow-x-auto">
					<table className="min-w-full divide-y divide-gray-200">
						<thead className="bg-gray-50">
							<tr>
								{[
									"Id",
									"Email",
									"First Name",
									"Middle Name",
									"Last Name",
									"Role",
									"Phone Number",
									"School",
									"Department",
									"Level",
									"Date",
								].map((header) => (
									<th
										key={header}
										className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
										onClick={() =>
											requestSort(header.toLowerCase() as keyof Participant)
										}
									>
										<div className="flex items-center gap-2">
											{header}
											{sortConfig?.key === header.toLowerCase() && (
												<span>
													{sortConfig.direction === "asc" ? "↑" : "↓"}
												</span>
											)}
										</div>
									</th>
								))}
							</tr>
						</thead>
						<tbody className="bg-white divide-y divide-gray-200">
							{sortedRows.length === 0 ? (
								<tr>
									<td
										colSpan={11}
										className="px-6 py-4 text-center text-gray-500"
									>
										No participants found
									</td>
								</tr>
							) : (
								sortedRows.map((row, i) => (
									<tr key={i} className="hover:bg-gray-50">
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
											{i + 1}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
											{row.email}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
											{row.first_name}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
											{row.middle_name}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
											{row.last_name}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
											{row.role}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
											{row.phone_number}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
											{row.school}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
											{row.department}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
											{row.level}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
											{new Date(row.created_at).toLocaleDateString()}
										</td>
									</tr>
								))
							)}
						</tbody>
					</table>
				</div>
			</div>

			<div className="flex justify-end mt-6">
				<a
					download
					href="/api/participants/download"
					className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
				>
					<span className="mr-2">Export to spreadsheet</span>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={2}
						stroke="currentColor"
						className="w-5 h-5"
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
