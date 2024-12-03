exports.up = async (knex) => {
  await knex.schema.createTable('typing_log', (table) => {
    table.increments('id').primary();
    table.integer('sentence_id').notNullable();
    table.integer('user_id').notNullable();
    table.integer('wpm').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table
      .foreign('sentence_id')
      .references('sentence_list.id')
      .onDelete('CASCADE');
    table.foreign('user_id').references('user_list.id').onDelete('CASCADE');
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('typing_log');
};
