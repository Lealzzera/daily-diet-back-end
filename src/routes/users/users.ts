import { FastifyInstance } from "fastify";
import { randomUUID } from "crypto";
import { z } from "zod";
import { knexConfig } from "../../database";
import { hashPassword } from "../../utils/hashPassword";

export async function usersRoutes(app: FastifyInstance) {
	app.get("/", async (req, res) => {
		try {
			const users = await knexConfig("users").select("*");
			return res.status(200).send({ users });
		} catch (err) {
			return res.status(400).send({ error: err });
		}
	});

	app.get("/:id", async (req, res) => {
		try {
			const userParamsSchema = z.object({
				id: z.string().uuid(),
			});

			const { id } = userParamsSchema.parse(req.params);
			const user = await knexConfig("users")
				.select("*")
				.where("id", id)
				.first();

			return res.status(200).send({ user });
		} catch (err) {
			return res.status(400).send({ error: err });
		}
	});

	app.post("/", async (req, res) => {
		try {
			const createUserSchema = z.object({
				name: z.string(),
				email: z.string().email(),
				password: z.string().min(6),
			});
			const { name, email, password } = createUserSchema.parse(req.body);
			const hashedPassword = hashPassword(password);
			await knexConfig("users").insert({
				id: randomUUID(),
				name,
				email,
				password: hashedPassword,
			});
		} catch (err) {
			res.status(400).send(err);
		}
	});

	app.delete("/:id", async (req, res) => {
		try {
			const userParamsSchema = z.object({
				id: z.string().uuid(),
			});
			const { id } = userParamsSchema.parse(req.params);
			await knexConfig("users").where("id", id).del();

			return res.status(200).send();
		} catch (err) {
			return res.status(400).send({ error: err });
		}
	});

	app.patch("/:id", async (req, res) => {
		try {
			const userParamsSchema = z.object({
				id: z.string().uuid(),
			});
			const userBodySchema = z.object({
				password: z.string().min(6).optional(),
				email: z.string().email().optional(),
				streak: z.number().optional(),
			});
			const { id } = userParamsSchema.parse(req.params);
			const { email, password, streak } = userBodySchema.parse(req.body);

			const hashedPassword = hashPassword(password);

			await knexConfig("users")
				.where("id", id)
				.update({ email, password: hashedPassword, streak });
			return res.status(200).send();
		} catch (err) {
			return res.status(400).send({ error: err });
		}
	});
}
