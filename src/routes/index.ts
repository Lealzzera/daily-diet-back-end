import { FastifyInstance } from "fastify";
import { usersRoutes } from "./users/users";
import { mealsRoutes } from "./meals";

export async function appRoutes(app: FastifyInstance) {
	app.register(usersRoutes, {
		prefix: "users",
	});

	app.register(mealsRoutes, {
		prefix: "meals",
	});
}
