import type { LoaderFunction } from "@remix-run/node";
import { User } from "~/.server/model";
import { STATUS_CODE } from "~/.server/config";

export const loader: LoaderFunction = async () => {
	try {
		const data = await User.findMany();

		if (!data || data.length === 0) {
			return new Response("No participants found", {
				status: STATUS_CODE.NOT_FOUND,
				headers: {
					"Content-Type": "text/plain",
				},
			});
		}

		const header =
			"S/N, Email, First Name, Middle Name, Last Name, Designation, Phone Number, School, Department, Level, Date";

		const body = data
			.map(
				(row, i) =>
					`${i + 1},${row.email},${row.first_name},${row.middle_name},${
						row.last_name
					},${row.role},${row.phone_number},${row.school},${row.department},${
						row.level
					},${new Date(row.created_at).toLocaleDateString()}`
			)
			.join("\n");

		const csv = `${header}\n${body}`;

		return new Response(csv, {
			headers: {
				"Content-Type": "text/csv",
				"Content-Disposition":
					"attachment; filename=REGISTERED_PARTICIPANTS.csv",
			},
		});
	} catch (error) {
		console.error("Download participants error:", error);
		return new Response("Internal server error", {
			status: STATUS_CODE.INTERNAL_SERVER_ERROR,
			headers: {
				"Content-Type": "text/plain",
			},
		});
	}
};
