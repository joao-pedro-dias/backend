exports.up = function(knex) {
  return knex.schema.createTable('raffles', function(table) {
    table.increments('id');
    table.string('title', 50).notNullable();
    table.text('description').notNullable();
    table.float('price').notNullable();
    table.enu('status', ['A', 'I', 'E']).defaultTo('A').notNullable();
    table.integer('user_id').unsigned().notNullable().references('id').inTable('admins');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('expired_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};
  
exports.down = function(knex) {
  return knex.schema.dropTable('raffles');
};