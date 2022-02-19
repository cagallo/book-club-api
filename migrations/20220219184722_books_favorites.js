/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('books', (table) => {
      table.increments('id').primary();
      table.string('id');
      table.string('title');
      table.string('description');
      table.string('amazonLink');
      table.string('bookImage');
      table.string('author');
    }),
    knex.schema.createTable('favorites', (table) => {
      table.increments('id').primary();
      table.string('id');
      table.string('title');
      table.string('description');
      table.string('amazonLink');
      table.string('bookImage');
      table.string('author');
    })
  ]);
};
exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('books'),
    knex.schema.dropTable('favorites')
  ]);
};
