import { NextFunction, Request, Response } from "express";
import { AppResponse, Logger, STATUS_CODE } from "./config";
import { ZodError } from "zod";
// import pkg from "jsonwebtoken";
// import Logger from "../utils/Logger.js";
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

export const ErrorHandler = (
	error: any,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	Logger.error(`path: ${req.path} method: ${req.method}`);
	Logger.error(error);

	if (error instanceof AppError)
		AppResponse.error(res, error.message, error.details, error.statusCode);

	if (error instanceof ValidationError)
		AppResponse.error(
			res,
			error.message,
			error.details,
			STATUS_CODE.BAD_REQUEST
		);

	// if (error instanceof JsonWebTokenError)
	// 	return new ErrorResponse(
	// 		res,
	// 		"Invalid API key",
	// 		error,
	// 		STATUS_CODE.UNAUTHORIZED
	// 	);

	AppResponse.error(res, "Something went wrong.", error);
};
