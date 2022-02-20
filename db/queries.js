const connection = require('../knexfile')['development'];
const database = require('knex')(connection);

module.exports = {
    getAll() {
        return database('books')
    },
    getSingleBook(request) {
        return database('books').where('id', request.params.id).select();
    }

}
