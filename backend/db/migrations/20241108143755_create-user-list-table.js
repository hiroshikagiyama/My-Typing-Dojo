exports.up = async (knex) => {
  await knex.schema.createTable('user_list', (table) => {
    table.increments('id').primary();
    table.string('name', 64).notNullable();
    table.integer('target_wpm').notNullable();
    table.date('target_date').notNullable();
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('user_list');
};
