import { Prisma } from "@prisma/client";
import db from "./prisma.js";

export class User {
	async save(data: Prisma.ParticipantCreateInput) {
		return await db.participant.create({ data });
	}

	public static async findById(id: number) {
		return await db.participant.findUnique({ where: { id } });
	}

	public static async findByEmail(email: string) {
		return await db.participant.findUnique({ where: { email } });
	}

	public static async findMany() {
		return await db.participant.findMany();
	}
}

export class Admin {
	public static async fineByUsername(username: string) {
		return await db.admin.findFirst({ where: { username } });
	}
}
