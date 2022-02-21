require('dotenv').config();
const connection = require('./knexfile')['production'];
const database = require('knex')(connection);

console.log(process.env.DATABASE_URL);

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
      return database('favorites').where('isbn', request.params.isbn).del();
    },
    getAllFavs() {
      return database('favorites');
    }
}
