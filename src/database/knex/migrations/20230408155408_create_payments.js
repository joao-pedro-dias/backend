exports.up = function(knex) {
  return knex.schema.createTable('payments', function(table) {
    table.increments('id').primary();
    table.float('amount').notNullable();
    table.timestamp('payment_date').defaultTo(knex.fn.now());
    table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
    table.integer('raffle_id').unsigned().references('id').inTable('raffles').onDelete('CASCADE');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('payments');
};
