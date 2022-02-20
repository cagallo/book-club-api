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

app.get('/', (request, response) => {
  response.send('hey this is for books.');
});

app.get('/api/v1/books', (request, response) => {
  queries.getAll().then(data => response.send(data))
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

app.post('/api/v1/favorites', (request, response) => {
  const favorite = request.body;
  const { id, title, description, amazonLink, author, bookImage } = favorite;
  for (let requiredParameter of ['id', 'title', 'description', 'amazonLink', 'author', 'bookImage']) {
    if (!favorite[requiredParameter]) {
      response.status(422)
      .send({ error: `Expected format: {id: <String>, title: <String>, description: <String>, amazonLink: <String>, author: <String>, bookImage: <String>}. You’re missing a “${requiredParameter}” property.` });
    }
  }
  app.locals.favorites.push({ id, title, description, amazonLink, author, bookImage });
  response.status(201).json({ id, title, description, amazonLink, author, bookImage });

})

app.delete('/api/v1/favorites/:id', (request, response) => {
  const { id } = request.params
  const { favorites } = app.locals
  const favoriteToDelete = favorites.find(fav => fav.id === id)

  if (!favoriteToDelete) {
    return response.status(404).json({
      message: `No book found with id of #${id} in your favorites.`
    })
  }

  app.locals.favorites = favorites.filter(fav => fav.id !== id)

  response.status(200).json({
    message: `Book #${id} has been deleted from favorites`
  })
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on on http://localhost:${app.get('port')}.`);
});
