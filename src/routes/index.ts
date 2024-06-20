import { FastifyInstance } from "fastify";
import { knexConfig } from "../database";
import { randomUUID } from "crypto";
import { z } from "zod";

export async function appRoutes(app: FastifyInstance) {
	app.post("/users", async (req, res) => {
		const createUserSchema = z.object({
			name: z.string(),
			email: z.string().email(),
			password: z.string().min(6),
		});

		try {
			const { name, email, password } = createUserSchema.parse(req.body);
			await knexConfig("users").insert({
				id: randomUUID(),
				name,
				email,
				password,
			});
		} catch (err) {
			res.status(400).send(err);
		}
	});

	app.get("/users", async (req, res) => {
		const data = await knexConfig("users").select("*");
		return data;
	});

	app.delete("/users", async (req, res) => {
		const data = await knexConfig("users").select();
	});
}
