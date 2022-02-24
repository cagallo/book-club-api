exports.up = function(knex) {
  return knex.schema.table('favorites', (table) => {
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.table('favorites', (table) => {
    table.dropTimestamps();
  });
};
