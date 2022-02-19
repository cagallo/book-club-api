const express = require('express');
const filteredBooks = require('./data/filtered-books-data');
const app = express();

app.set('port', process.env.PORT || 3001);
app.locals.title = 'Books Data';
app.locals.books = filteredBooks;

app.get('/', (request, response) => {
  response.send('hey this is for books.');
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on on http://localhost:${app.get('port')}.`);
});
