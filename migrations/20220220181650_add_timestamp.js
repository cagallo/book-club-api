exports.up = function(knex) {
  return knex.schema.table('books', (table) => {
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.table('books', (table) => {
    table.dropTimestamps();
  });
};
