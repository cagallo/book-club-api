require('dotenv').config();
const connection = require('./knexfile')[process.env.NODE_ENV || 'development'];
const database = require('knex')(connection);

module.exports = {
    getAllBooks() {
      return database('books');
    },
    getSingleBook(request) {
      return database('books').where('isbn', request.params.isbn).select();
    },
    addBookToFavs(favorite) {
      return database('favorites').insert(favorite, 'id');
    },
    removeBookFromFavs(request) {
      return database('favorites').where('isbn', request.params.isbn).del();
    },
    getAllFavs() {
      return database('favorites');
    },
    updateFavorited(request) {
      console.log("isbn -------->", request.params.isbn);
      console.log("REQUEST BODY======>", JSON.stringify(request.body));
      return database('books').where('isbn', request.params.isbn).update({isFavorited: request.body.isFavorited});
    }
}
