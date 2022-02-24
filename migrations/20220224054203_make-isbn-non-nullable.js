exports.up = function(knex) {
  return knex.schema.alterTable('favorites', (table) => {
    table.string('isbn').notNullable().alter();
  })
};

exports.down = function(knex) {
  return knex.schema.alterTable('favorites', (table) => {
    table.string('isbn').nullable().alter();
  })
};

