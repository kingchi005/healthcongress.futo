import { json, redirect } from "@remix-run/node";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { Validation } from "~/.server/healpers";
import { Admin } from "~/.server/model";
import { STATUS_CODE } from "~/.server/config";

export const loader: LoaderFunction = async ({ request }) => {
	try {
		// Only allow POST requests
		if (request.method !== "POST") {
			return json(
				{
					ok: false,
					message: "Method not allowed",
				},
				{ status: STATUS_CODE.METHOD_NOT_ALLOWED }
			);
		}

		return null;
	} catch (error) {
		console.error("Login loader error:", error);
		return json(
			{
				ok: false,
				message: "Internal server error",
			},
			{ status: STATUS_CODE.INTERNAL_SERVER_ERROR }
		);
	}
};

export const action: ActionFunction = async ({ request }) => {
	try {
		// Double check method in action as well
		if (request.method !== "POST") {
			return json(
				{
					ok: false,
					message: "Method not allowed",
				},
				{ status: STATUS_CODE.METHOD_NOT_ALLOWED }
			);
		}

		const formData = await request.formData();
		const fields = Object.fromEntries(formData.entries());

		const validate = Validation.login.safeParse(fields);

		if (!validate.success) {
			return json(
				{
					ok: false,
					message: validate.error.issues.map((d) => d.message).join(", "),
				},
				{ status: STATUS_CODE.BAD_REQUEST }
			);
		}

		const { password, username } = validate.data;

		const admin = await Admin.fineByUsername(username);

		if (!admin || admin.password !== password)
			return json(
				{
					ok: false,
					message: "Invalid username or password",
				},
				{ status: STATUS_CODE.UNAUTHORIZED }
			);

		return json({
			ok: true,
			message: "Login successful",
		});
	} catch (error) {
		console.error("Login action error:", error);
		return json(
			{
				ok: false,
				message: "Internal server error",
			},
			{ status: STATUS_CODE.INTERNAL_SERVER_ERROR }
		);
	}
};
