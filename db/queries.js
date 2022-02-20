const connection = require('../knexfile')['development'];
const database = require('knex')(connection);

module.exports = {
    getAll() {
        return database('books')
    }
}
