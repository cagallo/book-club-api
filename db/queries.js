const connection = require('../knexfile')['development'];
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
      return database('favorites').where('isbn', request.params.isbn)
        .del()
        .then(() => {
          return database.select().from('favorites');
        });
    },
    getAllFavs() {
      return database('favorites');
    }
}
