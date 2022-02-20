/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const booksData = require('../../data/filtered-books-data');
const favorites = require("../../data/favorites-data");

exports.seed = function(knex) {
  // Deletes ALL existing entries
    return knex('books').del()
    .then(() => {
      return knex.raw('ALTER SEQUENCE books_id_seq RESTART WITH 1');
    })
    .then(() => {
      return knex('books').insert(booksData);
    })
    .then(() => {
      return knex('favorites').del()
      .then(() => {
        return knex.raw('ALTER SEQUENCE favorites_id_seq RESTART WITH 1');
      })
      .then(() => {
        return knex('favorites').insert(favorites);
      })
    })
};
