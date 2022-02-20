/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const booksData = require('../data/filtered-books-data');
const favorites = require("../data/favorites-data");

exports.seed = function(knex) {
  // Deletes ALL existing entries
    return knex('books').del()
    .then(() => {
      return knex('books').insert(booksData)
    })
};
