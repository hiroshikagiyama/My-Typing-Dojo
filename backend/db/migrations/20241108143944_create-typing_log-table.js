exports.up = async (knex) => {
  await knex.schema.createTable('typing_log', (table) => {
    table.increments('id').primary();
    table.integer('sentence_id').notNullable();
    table.integer('user_id').notNullable();
    table.integer('wpm').notNullable();
    table.date('date').notNullable();
    table.foreign('sentence_id').references('sentence_list.id');
    table.foreign('user_id').references('user_list.id');
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('typing_log');
};
