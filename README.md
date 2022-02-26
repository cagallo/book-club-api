# Book Club API

## Endpoints

| Description | URL         | Method      | Required Properties for Request | Sample Sucessful Response |
| ----------- | ----------- | ----------- | ------------------------------- | ------------------------- |
| Get All Books | `https://book-club-api-2110.herokuapp.com/api/v1/books` | GET | none | array containing all book objects |    
| Get Single Book | `https://book-club-api-2110.herokuapp.com/api/v1/books/:isbn` <br> *where isbn will be the isbn number of single book* | GET | none | array containing an object of single book info |
| Get All Favorites | `https://book-club-api-2110.herokuapp.com/api/v1/favorites` | GET | none | array container all favorite book objects | 
| Add New Favorite | `https://book-club-api-2110.herokuapp.com/api/v1/favorites` | POST | `{ "isbn": "9781250278210", "title": "ABANDONED IN DEATH", "description": "...", "amazon_link": "https://www.amazon.com/dp/125027821X?tag=NYTBSREV-20", "book_image": "https://storage.googleapis.com/du-prd/books/images/9781250278210.jpg", "author": "J.D. Robb"}` | `{ id: <id> in favorites table}` |
| Delete Single Favorited Book | `https://book-club-api-2110.herokuapp.com/api/v1/favorites/:isbn` <br> *where isbn will be the isbn number of single book* | DELETE | none | `{ message: Book with isbn#<isbn> has been removed from favorites }` |
| Edit Favorited Status | `https://book-club-api-2110.herokuapp.com/api/v1/books/9780525559474` | PATCH | `{"isFavorited":"false" OR "true"}` | `{ "message": "Book with isbn#<isbn> isFavorited: "false" OR "true" }` |
