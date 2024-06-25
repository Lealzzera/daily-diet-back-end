//eslint-disable-next-line
import { Knex } from "knex";

declare module "knex/types/tables" {
	export interface Tables {
		users: {
			id: string;
			name: string;
			email: string;
			password: string;
			created_at: string;
		};
		meals: {
			id: string;
			title: string;
			description: string;
			diet_meal: boolean;
			created_at: string;
		};
	}
}