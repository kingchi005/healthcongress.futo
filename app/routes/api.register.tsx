import { json } from "@remix-run/node";
import type { ActionFunction } from "@remix-run/node";
import { Validation } from "~/.server/healpers";
import { User } from "~/.server/model";
import { STATUS_CODE } from "~/.server/config";

export const action: ActionFunction = async ({ request }) => {
	try {
		const formData = await request.formData();
		const fields = Object.fromEntries(formData.entries());

		const validate = Validation.register.safeParse(fields);

		if (!validate.success) {
			return json(
				{
					ok: false,
					message: validate.error.issues.map((d) => d.message).join(", "),
				},
				{ status: STATUS_CODE.BAD_REQUEST }
			);
		}

		const data = validate.data;
		const existingUser = await User.findByEmail(data.email);

		if (existingUser) {
			return json(
				{
					ok: false,
					message: "This email is already registered",
				},
				{ status: STATUS_CODE.CONFLICT }
			);
		}

		const created = await User.save(data);

		if (!created) {
			return json(
				{
					ok: false,
					message: "Error creating user",
				},
				{ status: STATUS_CODE.INTERNAL_SERVER_ERROR }
			);
		}

		return json(
			{
				ok: true,
				message: "You have successfully registered for this event",
				data: { created },
			},
			{ status: STATUS_CODE.CREATED }
		);
	} catch (error) {
		console.error("Registration error:", error);
		return json(
			{
				ok: false,
				message: "Internal server error",
			},
			{ status: STATUS_CODE.INTERNAL_SERVER_ERROR }
		);
	}
};
