require('dotenv').config();
const cors = require('cors');
const { request, response } = require('express');
const express = require('express');
const { all } = require('express/lib/application');
const favorites = require('./data/favorites-data');
const filteredBooks = require('./data/filtered-books-data');
const app = express();
const queries = require('./queries');

app.use(express.json());
app.use(cors())

app.set('port', process.env.PORT || 3001);
app.locals.title = 'Books Data';
app.locals.books = filteredBooks;
app.locals.favorites = favorites;

app.get('/api/v1/books', (request, response) => {
  queries.getAllBooks()
    .then(data => response.status(200).json(data))
    .catch(error => response.status(500).json({ error }))
});

app.get('/api/v1/books/:isbn', (request, response) => {
  queries.getSingleBook(request)
    .then(books => {
      if (books.length) {
        response.status(200).json(books);
      } else {
        response.status(404).json({
          error: `Could not find book with isbn ${request.params.isbn}`
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
      return response.status(422)
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
          error: `Could not find book with isbn ${request.params.isbn}`
        });
      }
    });
});

app.patch('/api/v1/books/:isbn', async (request, response) => {
  queries.updateFavorited(request)
    .then(count => {
      if (count) {
        response.status(200).json({message: `Book with isbn#${request.params.isbn} isFavorited: ${request.body.isFavorited}`})
      } else {
        response.status(400).json({error: 'This request failed. Double check your request body and isbn# for proper formatting'})
      }
    });
});
  

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on on http://localhost:${app.get('port')}.`);
});
