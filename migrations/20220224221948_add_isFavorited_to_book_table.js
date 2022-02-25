exports.up = function(knex) {
  return knex.schema.table('books', (table) => {
    table.string('isFavorited').defaultTo(false)
  })
};

exports.down = function(knex) {
  return knex.schema.table('books', (table) => {
    table.dropColumn('isFavorited');
  })
};
