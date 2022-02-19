/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function(knex) {
  return knex.schema.createTable('books', (table) => {
      table.increments('id').primary();
      table.string('isbn');
      table.string('title');
      table.string('description');
      table.string('amazonLink');
      table.string('bookImage');
      table.string('author');
    })
};
exports.down = function(knex) {
  return knex.schema.dropTable('books');
};
