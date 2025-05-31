import { z } from "zod";
import { Logger } from "./config";

export function sanitizeHtml(html: string) {
	return html.trim().replaceAll("<", "").replaceAll(">", "");
}

const getStringValidation = (key: string) =>
	z
		.string({
			required_error: `'${key}' is required`,
			invalid_type_error: `'${key}' must be a string`,
		})
		.min(2, { message: `'${key}' must be 2 or more characters` })
		.transform(sanitizeHtml);
const getOptionalStringValidation = (key: string) =>
	z
		.string({
			required_error: `'${key}' is required`,
			invalid_type_error: `'${key}' must be a string`,
		})
		.optional()
		.transform((v) => sanitizeHtml(v || ""));

export const Validation = {
	login: z.object({
		username: getStringValidation("username"),
		password: getStringValidation("password"),
	}),
	register: z.object({
		middle_name: getOptionalStringValidation("middle_name").transform((v) =>
			v.toUpperCase()
		),
		email: getStringValidation("email"),
		first_name: getStringValidation("first_name").transform((v) =>
			v.toUpperCase()
		),
		last_name: getStringValidation("last_name").transform((v) =>
			v.toUpperCase()
		),
		role: getStringValidation("role"),
		phone_number: getStringValidation("phone_number"),
		school: getStringValidation("school"),
		department: getStringValidation("department"),
		level: getStringValidation("level"),
	}),
};
