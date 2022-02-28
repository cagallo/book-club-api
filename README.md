# Book Club API

- Deployed API on Heroku [here](https://book-club-api-2110.herokuapp.com/api/v1/books) <br>
- Frontend Repo [here](https://github.com/ectweitmann/book-club-ui) <br>
- Project Spec [here](https://frontend.turing.edu/projects/module-3/stretch.html)

## Background

This server was created to accompany the user interface of 'Book Club', a frontend Mod 3 project at the Turing School of Software and Design. We used the NYT Best Selling Books API to populate a PostgreSQL database which this API querys using knex. This server was written in JavaScript using Express and Node.

## Installation Instructions

1. Clone down this repo to your local machine:
    - `git@github.com:cagallo/book-club-api.git`
2. Change into the new directory:
    - `cd book-club-api`
3. Install the dependencies:
    - `npm install`
4. To fire up the server, run:
    - `node server.js` or `nodemon server.js`(if you have nodemon installed)
5. In the browser or postman, use the following endpoints with the base URL: http://localhost:3000/ to retrieve, post, or delete data. You can also use the following endpoints on the deployed Heroku API linked above. 

## Endpoints

| Description | URL         | Method      | Required Properties for Request | Sample Sucessful Response |
| ----------- | ----------- | ----------- | ------------------------------- | ------------------------- |
| Get All Books | `http://localhost:3001/api/v1/books` | GET | none | array containing all book objects |    
| Get Single Book | `http://localhost:3001/api/v1/books/:isbn` <br> *where isbn will be the isbn number of single book* | GET | none | array containing an object of single book info |
| Get All Favorites | `http://localhost:3001/api/v1/favorites` | GET | none | array container all favorite book objects | 
| Add New Favorite | `http://localhost:3001/api/v1/favorites` | POST | `{ "isbn": "9781250278210", "title": "ABANDONED IN DEATH", "description": "...", "amazon_link": "https://www.amazon.com/dp/125027821X?tag=NYTBSREV-20", "book_image": "https://storage.googleapis.com/du-prd/books/images/9781250278210.jpg", "author": "J.D. Robb"}` | `{ id: <id> in favorites table}` |
| Delete Single Favorited Book | `http://localhost:3001/api/v1/favorites/:isbn` <br> *where isbn will be the isbn number of single book* | DELETE | none | `{ message: Book with isbn#<isbn> has been removed from favorites }` |
| Edit Favorited Status | `http://localhost:3001/api/v1/books/:isbn` | PATCH | `{"isFavorited":"false" OR "true"}` | `{ "message": "Book with isbn#<isbn> isFavorited: "false" OR "true" }` |

## Technologies Used

- Express
- PostgreSQL
- Knex.js
- JavaScript
- Node
- Node-Fetch
- PgAdmin4
- Heroku
- Postman

## Authors

- [Kayla Durrett](https://github.com/krdurrett)
- [Chez Gallo](https://github.com/cagallo)
- [Christine Rowland](https://github.com/Fordo29)
- [Ethan Tweitmann](https://github.com/ectweitmann)

- Project Manager: [Robbie Jaeger](https://github.com/robbiejaeger)
