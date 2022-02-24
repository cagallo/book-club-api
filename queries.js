require('dotenv').config();
const connection = require('./knexfile')[process.env.NODE_ENV || 'development'];
const database = require('knex')(connection);

module.exports = {
    getAllBooks() {
      return database('books');
    },
    getSingleBook(request) {
      return database('books').where('id', request.params.id).select();
    },
    addBookToFavs(favorite) {
      return database('favorites').insert(favorite, 'id');
    },
    removeBookFromFavs(request) {
      return database('favorites').where('id', request.params.id).del();
    },
    getAllFavs() {
      return database('favorites');
    }
}
