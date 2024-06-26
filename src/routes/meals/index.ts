import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { knexConfig } from "../../database";

declare module "fastify" {
	interface FastifyRequest {
		userId?: string;
	}
}

export async function mealsRoutes(app: FastifyInstance) {
	app.addHook("preHandler", async (req: FastifyRequest, res: FastifyReply) => {
		const { user_id } = req.headers;

		if (!user_id) {
			res.status(400).send("Not Athorized");
		}
		if (!Array.isArray(user_id)) {
			req.userId = user_id;
		}
	});
	app.post("/", async (req, res) => {
		try {
			const mealBodySchema = z.object({
				title: z.string(),
				description: z.string(),
				diet_meal: z.boolean().default(false),
			});
			const { title, description, diet_meal } = mealBodySchema.parse(req.body);

			await knexConfig("meals").insert({
				user_id: req.userId,
				title,
				description,
				diet_meal,
			});

			return res.status(201).send();
		} catch (err) {
			return res.status(400).send({ error: err });
		}
	});

	app.get("/", async (req, res) => {
		try {
			const meals = await knexConfig("meals")
				.select("*")
				.where("user_id", req.userId);
			return res.status(200).send({ meals });
		} catch (err) {
			return res.status(400).send({ error: err });
		}
	});

	app.get("/:id", async (req, res) => {
		try {
			const mealParamSchema = z.object({
				id: z.coerce.number(),
			});

			const { id } = mealParamSchema.parse(req.params);
			const meal = await knexConfig("meals").where("id", id).first();

			return res.status(200).send({ meal });
		} catch (err) {
			return res.status(400).send({ error: err });
		}
	});

	app.delete("/:id", async (req, res) => {
		try {
			const mealParamSchema = z.object({
				id: z.coerce.number(),
			});

			const { id } = mealParamSchema.parse(req.params);
			await knexConfig("meals").where("id", id).del();

			return res.status(200).send();
		} catch (err) {
			return res.status(400).send({ error: err });
		}
	});

	app.patch("/:id", async (req, res) => {
		try {
			const mealBodySchema = z.object({
				title: z.string().optional(),
				description: z.string().optional(),
				diet_meal: z.boolean().optional(),
			});
			const mealParamSchema = z.object({
				id: z.coerce.number(),
			});

			const body = mealBodySchema.parse(req.body);
			const { id } = mealParamSchema.parse(req.params);
			await knexConfig("meals")
				.where("id", id)
				.update({ ...body });

			return res.status(200).send();
		} catch (err) {
			return res.status(400).send({ error: err });
		}
	});
}
