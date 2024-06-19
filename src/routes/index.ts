import { FastifyInstance } from "fastify";
import { knexConfig } from "../database";
import { randomUUID } from "crypto";

export async function appRoutes(app: FastifyInstance) {
	app.post("/users", async (req, res) => {
		const { body } = req;
		await knexConfig("users").insert({
			id: randomUUID(),
			...body,
		});
	});

	app.get("/users", async (req, res) => {
		const data = await knexConfig("users").select("*");
		console.log(data);
	});
}
