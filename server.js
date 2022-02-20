const { request, response } = require('express');
const express = require('express');
const favorites = require('./data/favorites-data');
const filteredBooks = require('./data/filtered-books-data');
const app = express();
const queries = require('./db/queries');
app.use(express.json());


app.set('port', process.env.PORT || 3001);
app.locals.title = 'Books Data';
app.locals.books = filteredBooks;
app.locals.favorites = favorites;

app.get('/', (request, response) => {
  response.send('hey this is for books.');
});

app.get('/api/v1/books', (request, response) => {
  queries.getAllBooks()
    .then(data => response.status(200).json(data))
    .catch(error => response.status(500).json({ error }))
});

app.get('/api/v1/books/:id', (request, response) => {
  queries.getSingleBook(request)
    .then(data => response.status(200).json(data))
    .catch(error => response.status(404).json({ error }));
});

app.get('/api/v1/favorites', (request, response) => {
  queries.getAllFavs()
    .then(data => response.status(200).json(data))
    .catch(error => response.status(500).json({ error }))
});

app.post('/api/v1/favorites', (request, response) => {
  const favorite = request.body;
  const { title, description, 'amazon_link': amazonLink, author, 'book_image': bookImage } = favorite;
  for (let requiredParameter of ['title', 'description', 'amazon_link', 'author', 'book_image']) {
    if (!favorite[requiredParameter]) {
      response.status(422)
      .send({ error: `Expected format: {title: <String>, description: <String>, amazonLink: <String>, author: <String>, bookImage: <String>}. You’re missing a “${requiredParameter}” property.` });
    }
  }
  queries.addBookToFavs(favorite)
    .then(data => response.status(201).json(data))
    .catch(error => response.status(500).json({ error }));
});

app.delete('/api/v1/favorites/:isbn', (request, response) => {
  queries.removeBookFromFavs(request);
  response.status(200).json({
    message: `Book with isbn #${request.params.isbn} has been deleted from favorites`
  })
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on on http://localhost:${app.get('port')}.`);
});
