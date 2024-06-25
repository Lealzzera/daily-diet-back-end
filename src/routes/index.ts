import { FastifyInstance } from "fastify";
import { usersRoutes } from "./users/users";

export async function appRoutes(app: FastifyInstance) {
	app.register(usersRoutes, {
		prefix: "users",
	});
}
