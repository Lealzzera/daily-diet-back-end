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

			const [, streak, bestStreak] = await Promise.resolve([
				await knexConfig("meals").insert({
					user_id: req.userId,
					title,
					description,
					diet_meal,
				}),
				await knexConfig("users").select("streak").where("id", req.userId),
				await knexConfig("users").select("best_streak").where("id", req.userId),
			]);

			if (diet_meal) {
				await knexConfig("users")
					.where("id", req.userId)
					.update({
						streak: streak[0].streak + 1,
					});
			}
			if (!diet_meal) {
				await knexConfig("users").where("id", req.userId).update({
					streak: 0,
				});
			}
			if (streak[0].streak >= bestStreak[0].best_streak) {
				await knexConfig("users")
					.where("id", req.userId)
					.update({
						best_streak: streak[0].streak + 1,
					});
			}
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
