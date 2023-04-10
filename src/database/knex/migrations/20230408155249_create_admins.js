exports.up = function(knex) {
  return knex.schema.createTable('admins', function(table) {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('email').unique().notNullable();
    table.string('password').notNullable();
    table.string('phone').notNullable();
    table.string('address').notNullable();
    table.string('cep').notNullable();
    table.string('address_number').notNullable();
    table.string('district').notNullable();
    table.string('complement').nullable();
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('admins');
};
  