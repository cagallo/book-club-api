const express = require('express');
const filteredBooks = require('./data/filtered-books-data');
const app = express();

app.set('port', process.env.PORT || 3001);
app.locals.title = 'Books Data';
app.locals.books = filteredBooks;

app.get('/', (request, response) => {
  response.send('hey this is for books.');
});

app.get('/api/v1/books', (request, response) => {
  const books = app.locals.books;

  response.status(200).json({ books });
});

app.get('/api/v1/books/:id', (request, response) => {
  const { id } = request.params;
  const book = app.locals.books.find(book => {
    return book.id === id
  });
  if (!book) {
    return response.status(404).json({
      message: `No novel found with id of #${id}.`
    });
  }

  response.status(200).json(book);
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on on http://localhost:${app.get('port')}.`);
});
