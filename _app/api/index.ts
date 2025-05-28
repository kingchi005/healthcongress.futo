import { Validation } from "_app/api/healpers";
import { Request, Response } from "express";
import { AppResponse, Logger, STATUS_CODE } from "./config";
import { Admin, User } from "./model";
import { AppError } from "./exception";

export default class Api {
	public static async register(req: Request, res: Response) {
		const validate = Validation.register.safeParse(req.fields);

		if (!validate.success)
			return res.status(401).json({
				ok: false,
				message: validate.error.issues.map((d) => d.message).join(", "),
			});

		const data = validate.data;
		const existingUser = await User.findByEmail(data.email);

		if (existingUser)
			throw new AppError(
				"This email is already registered",
				STATUS_CODE.CONFLICT
			);

		const user = new User(
			data.middle_name,
			data.email,
			data.first_name,
			data.last_name,
			data.role,
			data.phone_number,
			data.school,
			data.department,
			data.level
		);

		const created = user.save();

		if (!created)
			throw new AppError(
				"Error creating user",
				STATUS_CODE.INTERNAL_SERVER_ERROR
			);

		AppResponse.success(
			res,
			"You have successfully registered for theis event",
			{ created },
			STATUS_CODE.CREATED
		);
	}
	public static async login(req: Request, res: Response) {
		const validate = Validation.login.safeParse(req.fields);

		if (!validate.success)
			return res.status(401).json({
				ok: false,
				message: validate.error.issues.map((d) => d.message).join(", "),
			});

		const { password, username } = validate.data;

		const admin = await Admin.fineByUsername(username);

		if (!admin || admin.password !== password)
			throw new AppError(
				"Invalid username or password",
				STATUS_CODE.UNAUTHORIZED
			);

		AppResponse.success(res, "Login successful");
	}

	public static async findOneParticipant(req: Request, res: Response) {
		const id = +req.params.id;
		const data = await User.findById(id);
		if (!data) throw new AppError("Not found", STATUS_CODE.NOT_FOUND);
		Logger.info({ data });
		AppResponse.success(res, "Fetched", data);
	}

	public static async getAllParticipant(req: Request, res: Response) {
		const data = await User.findMany();

		AppResponse.success(res, "Fetched", data);
	}

	public static async downloadParticipantFile(req: Request, res: Response) {
		const data = await User.findMany();

		const header =
			"S/N, Email, First Name, Middle Name, Last Name, Designation, Phone Number, School, Department, Level, Date";

		const body = data
			.map(
				(row, i) =>
					//prettier-ignore
					`${i + 1},${row.email},${row.first_name},${row.middle_name},${row.last_name},${row.role},${row.phone_number},${row.school},${row.department},${row.level},${new Date(row.created_at).toLocaleDateString()}`
			)
			.join("\n");

		const csv = `${header}\n${body}`;

		res
			.setHeader("Content-Type", "text/csv")
			.setHeader(
				"Content-Disposition",
				"attachment; filename=REGISTERED_PARTICIPANTS.csv"
			)
			.send(csv);
	}
}
