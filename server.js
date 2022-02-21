require('dotenv').config();
const { request, response } = require('express');
const express = require('express');
const favorites = require('./data/favorites-data');
const filteredBooks = require('./data/filtered-books-data');
const app = express();
const queries = require('./queries');
app.use(express.json());

app.set('port', process.env.PORT || 3001);
app.locals.title = 'Books Data';
app.locals.books = filteredBooks;
app.locals.favorites = favorites;

app.get('/api/v1/books', (request, response) => {
  console.log(process.env.TEST);
  queries.getAllBooks()
    .then(data => response.status(200).json(data))
    .catch(error => response.status(500).json({ error }))
});

app.get('/api/v1/books/:id', (request, response) => {
  queries.getSingleBook(request)
    .then(books => {
      if (books.length) {
        response.status(200).json(books);
      } else {
        response.status(404).json({
          error: `Could not find book with id ${request.params.id}`
        });
      }
    })
    .catch(error => response.status(500).json({ error }));
});

app.get('/api/v1/favorites', (request, response) => {
  queries.getAllFavs()
    .then(data => response.status(200).json(data))
    .catch(error => response.status(500).json({ error }))
});

app.post('/api/v1/favorites', (request, response) => {
  const favorite = request.body;
  const { title, description, 'amazon_link': amazonLink, author, 'book_image': bookImage, isbn } = favorite;
  for (let requiredParameter of ['title', 'description', 'amazon_link', 'author', 'book_image', 'isbn']) {
    if (!favorite[requiredParameter]) {
      response.status(422)
      .json({ message: `Expected format: {title: <String>, description: <String>, amazonLink: <String>, author: <String>, bookImage: <String>, isbn: <String>}. You’re missing a “${requiredParameter}” property.` });
    }
  }
  queries.addBookToFavs(favorite)
    .then(data => response.status(201).json(data))
    .catch(error => response.status(500).json({ error }));
});

app.delete('/api/v1/favorites/:isbn', (request, response) => {
  queries.removeBookFromFavs(request)
    .then(count => {
      if (count) {
        response.status(200).json({ message: `Book with isbn#${request.params.isbn} has been removed from favorites.`});
      } else {
        response.status(404).json({
          error: `Could not find book with id ${request.params.isbn}`
        });
      }
    });
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on on http://localhost:${app.get('port')}.`);
});
