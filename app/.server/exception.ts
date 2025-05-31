import { STATUS_CODE } from "./config";
import { ZodError } from "zod";
// import pkg from "jsonwebtoken";
// import console from "../utils/console.js";
// const { JsonWebTokenError } = pkg;

export class AppError extends Error {
	constructor(
		public message: string,
		public statusCode: number,
		public details?: unknown
	) {
		super(message);
	}
}

export class ValidationError extends Error {
	public statusCode: number = STATUS_CODE.BAD_REQUEST;
	public details?: unknown;
	constructor(public error: ZodError<any>) {
		super(error.issues.map((d) => d.message).join(", "));
		this.details = error;
	}
}
