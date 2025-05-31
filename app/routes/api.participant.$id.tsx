import { json } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";
import { User } from "~/.server/model";
import { STATUS_CODE } from "~/.server/config";
import { Logger } from "~/.server/config";

export const loader: LoaderFunction = async ({ params }) => {
	try {
		const id = Number(params.id);

		if (isNaN(id)) {
			return json(
				{
					ok: false,
					message: "Invalid participant ID",
				},
				{ status: STATUS_CODE.BAD_REQUEST }
			);
		}

		const data = await User.findById(id);

		if (!data) {
			return json(
				{
					ok: false,
					message: "Participant not found",
				},
				{ status: STATUS_CODE.NOT_FOUND }
			);
		}

		Logger.info({ data });

		return json({
			ok: true,
			message: "Fetched",
			data,
		});
	} catch (error) {
		console.error("Get participant error:", error);
		return json(
			{
				ok: false,
				message: "Internal server error",
			},
			{ status: STATUS_CODE.INTERNAL_SERVER_ERROR }
		);
	}
};
