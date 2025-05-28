import { type Connection } from "mysql2";
import { Logger, db } from "./config.js";
import { sanitizeHtml } from "./healpers.js";

export class User {
	static readonly table = "participant";

	id!: number;
	created_at: string = "";
	middle_name: string;
	email: string;
	first_name: string;
	last_name: string;
	role: string;
	phone_number: string;
	school: string;
	department: string;
	level: string;
	constructor(
		middle_name: string,
		email: string,
		first_name: string,
		last_name: string,
		role: string,
		phone_number: string,
		school: string,
		department: string,
		level: string
	) {
		this.middle_name = middle_name;
		this.email = email;
		this.first_name = first_name;
		this.last_name = last_name;
		this.role = role;
		this.phone_number = phone_number;
		this.school = school;
		this.department = department;
		this.level = level;
	}

	async save() {
		const sql = `INSERT INTO ${User.name} (middle_name,email,first_name,last_name,role,phone_number,school,department,level) VALUES (?,?,?,?,?,?,?,?,?)`;

		const created = await db.query(sql, [
			this.middle_name,
			this.email,
			this.first_name,
			this.last_name,
			this.role,
			this.phone_number,
			this.school,
			this.department,
			this.level,
		]);

		return created;
	}

	public static async findById(id: number) {
		const sql = "SELECT * FROM participant WHERE id = ?";
		const [rows] = await db.query(sql, [id]);

		return (rows as User[])[0] || null;
	}

	public static async findByEmail(email: string) {
		const sql = `SELECT * FROM participant WHERE email = ?`;
		const [rows] = await db.query(sql, [email]);

		return (rows as User[])[0] || null;
	}

	public static async findMany() {
		const sql = `SELECT * FROM participant`;
		const [rows] = await db.query(sql);

		return rows as User[];
	}
}

export class Admin {
	static readonly table = "admin";

	id: number = 0;
	username!: string;
	password!: string;

	public static async fineByUsername(username: string) {
		const sql = `SELECT * FROM ${Admin.table} WHERE username = ?`;

		const [rows] = await db.query(sql, [username]);

		return (rows as Admin[])[0] || null;
	}
}
