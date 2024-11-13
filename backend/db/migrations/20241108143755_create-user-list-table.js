exports.up = async (knex) => {
  await knex.schema.createTable('user_list', (table) => {
    table.increments('id').primary();
    table.string('username').notNullable();
    table.string('salt').notNullable();
    table.string('hashed_password').notNullable();
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('user_list');
};
