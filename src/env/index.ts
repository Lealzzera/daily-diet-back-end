import "dotenv/config";
import { z } from "zod";

const envsSchema = z.object({
	NODE_ENV: z.enum(["development", "test", "production"]).default("production"),
	DATABASE_HOST: z.string(),
	DATABASE_USER: z.string(),
	DATABASE_PORT: z.coerce.number(),
	DATABASE_PASSWORD: z.string(),
	DATABASE_URL: z.string(),
	DATABASE_CLIENT: z.string(),
	SERVER_PORT: z.coerce.number().default(3333),
});

const _env = envsSchema.safeParse(process.env);

if (_env.success === false) {
	console.error("INVALID ENVIROMENT VARIABLES!", _env.error.format());
	throw new Error("Invalid enviroment variables.");
}

export const env = _env.data;
