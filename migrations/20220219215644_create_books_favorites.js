exports.up = function(knex) {
  return knex.schema.createTable('books', (table) => {
    table.increments('id').primary();
    table.string('isbn');
    table.string('title');
    table.string('description');
    table.string('amazon_link');
    table.string('book_image');
    table.string('author');
  }).createTable('favorites', (table) => {
    table.increments('id').primary();
    table.string('isbn');
    table.string('title');
    table.string('description');
    table.string('amazon_link');
    table.string('book_image');
    table.string('author');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('books').dropTable('favorites');
};
