import { FastifyInstance } from "fastify";
import { z } from "zod";
import { knexConfig } from "../../database";

export async function mealsRoutes(app: FastifyInstance) {
	app.post("/", async (req, res) => {
		try {
			const mealBodySchema = z.object({
				title: z.string(),
				description: z.string(),
				diet_meal: z.boolean().default(false),
			});
			const { title, description, diet_meal } = mealBodySchema.parse(req.body);

			await knexConfig("meals").insert({
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
			const meals = await knexConfig("meals").select("*");

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
