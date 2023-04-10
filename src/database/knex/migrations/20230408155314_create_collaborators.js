exports.up = function(knex) {
  return knex.schema.createTable('collaborators', function(table) {
    table.increments('id').primary();
    table.integer('admin_id').unsigned().references('id').inTable('admins').onDelete('CASCADE');
    table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
    table.enu('status', ['A', 'C']).defaultTo('A').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};
  
exports.down = function(knex) {
  return knex.schema.dropTable('collaborators');
};