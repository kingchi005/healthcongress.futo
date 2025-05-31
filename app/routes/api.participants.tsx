import { json } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";
import { User } from "~/.server/model";
import { STATUS_CODE } from "~/.server/config";

export const loader: LoaderFunction = async () => {
	try {
		const data = await User.findMany();

		return json({
			ok: true,
			message: "Fetched",
			data,
		});
	} catch (error) {
		console.error("Get participants error:", error);
		return json(
			{
				ok: false,
				message: "Internal server error",
			},
			{ status: STATUS_CODE.INTERNAL_SERVER_ERROR }
		);
	}
};
