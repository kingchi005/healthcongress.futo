import pino from "pino";
import mysql from "mysql2/promise";
import { configDotenv } from "dotenv";
configDotenv();

export const Logger = pino({
	transport: {
		target: "pino-pretty",
		options: { translateTime: "SYS:dd-mm-yy hh:mm:ss" },
	},
});
/* 
export class AppResponse {
	public static success<D = unknown>(
		res: Response,
		message: string,
		data?: D,
		statusCode: number = STATUS_CODE.OK
	) {
		res.status(statusCode).json({
			ok: true,
			message: message,
			data: data,
		});
	}

	public static error(
		res: Response,
		message: string,
		error?: unknown,
		statusCode: number = STATUS_CODE.INTERNAL_SERVER_ERROR
	) {
		res.status(statusCode).json({
			ok: false,
			message: message,
			error: error,
		});
	}
}
 */
export const STATUS_CODE = {
	OK: 200,
	CREATED: 201,
	ACCEPTED: 202,
	NO_CONTENT: 204,
	BAD_REQUEST: 400,
	UNAUTHORIZED: 401,
	FORBIDDEN: 403,
	NOT_FOUND: 404,
	METHOD_NOT_ALLOWED: 405,
	NOT_ACCEPTED: 406,
	CONFLICT: 409,
	INTERNAL_SERVER_ERROR: 500,
	BAD_GATEWAY: 502,
	SERVICE_UNAVAILABLE: 503,
	GATEWAY_TIMEOUT: 504,
	PAYMENT_REQUIRED: 402,
} as const;

export const UserType = {
	STAFF: "staff",
	ADMIN: "admin",
} as const;

class DB {
	private connection: mysql.Connection | null = null;
	private isConnecting: boolean = false;
	private connectionPromise: Promise<void> | null = null;

	constructor(private url: string) {
		if (!url) {
			throw new Error("Database URL is required");
		}
	}

	private async ensureConnection() {
		if (this.connection) {
			return;
		}

		if (this.isConnecting) {
			await this.connectionPromise;
			return;
		}

		this.isConnecting = true;
		this.connectionPromise = this.connect();

		try {
			await this.connectionPromise;
		} finally {
			this.isConnecting = false;
			this.connectionPromise = null;
		}
	}

	public async connect() {
		try {
			this.connection = await mysql.createConnection(this.url);
			console.log("Database connected successfully");
		} catch (error) {
			console.error("Database connection error:", error);
			throw new Error("Failed to connect to database");
		}
	}

	public async close() {
		if (this.connection) {
			try {
				await this.connection.end();
				this.connection = null;
				console.log("Database connection closed");
			} catch (error) {
				console.error("Error closing database connection:", error);
				throw new Error("Failed to close database connection");
			}
		}
	}

	public async query<T = any>(sql: string, params?: (string | number)[]) {
		try {
			await this.ensureConnection();

			if (!this.connection) {
				throw new Error("No database connection available");
			}

			const [rows] = await this.connection.execute(sql, params);
			return rows as T;
		} catch (error) {
			console.error("Database query error:", { sql, params, error });
			throw new Error("Database query failed");
		}
	}

	public async transaction<T>(
		callback: (connection: mysql.Connection) => Promise<T>
	): Promise<T> {
		try {
			await this.ensureConnection();

			if (!this.connection) {
				throw new Error("No database connection available");
			}

			await this.connection.beginTransaction();

			try {
				const result = await callback(this.connection);
				await this.connection.commit();
				return result;
			} catch (error) {
				await this.connection.rollback();
				throw error;
			}
		} catch (error) {
			console.error("Transaction error:", error);
			throw new Error("Transaction failed");
		}
	}
}

// Validate database URL
if (!process.env.DATABASE_STRING) {
	throw new Error("DATABASE_STRING environment variable is required");
}

export const db = new DB(process.env.DATABASE_STRING);

// Database connection
export async function connect() {
	try {
		await db.connect();
		console.log("Database connected successfully");
	} catch (error) {
		console.error("Database connection error:", error);
		throw error;
	}
}

// Close database connection
export async function disconnect() {
	try {
		await db.close();
		console.log("Database connection closed");
	} catch (error) {
		console.error("Error closing database connection:", error);
		throw error;
	}
}

// Execute query with error logging
export async function executeQuery<T>(sql: string, params: any[]): Promise<T> {
	try {
		return await db.query<T>(sql, params);
	} catch (error) {
		console.error("Database query error:", { sql, params, error });
		throw error;
	}
}

// Execute transaction with error logging
export async function executeTransaction<T>(
	callback: (tx: any) => Promise<T>
): Promise<T> {
	try {
		return await db.transaction<T>(callback);
	} catch (error) {
		console.error("Transaction error:", error);
		throw error;
	}
}
