import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable("meals", (table) => {
		table.increments("id").primary();
		table.text("title").notNullable();
		table.text("description").notNullable();
		table.boolean("diet_meal").notNullable();
		table.timestamp("created_at").defaultTo(knex.fn.now()).notNullable();
	});
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTable("meals");
}
