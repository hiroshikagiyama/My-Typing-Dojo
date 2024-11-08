exports.up = async (knex) => {
  await knex.schema.createTable('sentence_list', (table) => {
    table.increments('id').primary();
    table.string('sentence').notNullable();
    table.string('tag').notNullable();
    table.integer('add_user_id').notNullable();
    table.foreign('add_user_id').references('user_list.id');
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('sentence_list');
};
