/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
   return knex.schema.createTable('favorites', (table) => {
      table.increments('id').primary();
      table.string('isbn');
      table.string('title');
      table.string('description');
      table.string('amazonLink');
      table.string('bookImage');
      table.string('author');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('favorites');
};
