import { env } from "./env";
import { app } from "./app";

app.listen({ port: env.SERVER_PORT }).then(() => {
	console.log("HTTP SERVER RUNNING!");
});
