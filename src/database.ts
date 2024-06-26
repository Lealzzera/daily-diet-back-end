import { knex, Knex } from "knex";
import { env } from "./env";

export const config: Knex.Config = {
	client: env.DATABASE_CLIENT,
	connection: {
		host: env.DATABASE_HOST,
		port: env.DATABASE_PORT,
		user: env.DATABASE_USER,
		password: env.DATABASE_PASSWORD,
		database: env.DATABASE_URL,
	},
	migrations: {
		extension: "ts",
		directory: "./db/migrations",
	},
};

export const knexConfig = knex(config);
