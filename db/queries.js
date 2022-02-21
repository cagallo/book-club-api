const connection = require('../knexfile')['development'];
const database = require('knex')(connection);

module.exports = {
    getAllBooks() {
      return database('books');
    },
    getSingleBook(request) {
      return database('books').where('id', request.params.id).select();
    },
    addBookToFavs(favorite) {
      return database('favorites').insert(favorite, 'id');
    },
    removeBookFromFavs(request) {
      return database('favorites').where('isbn', request.params.isbn).del();
    },
    getAllFavs() {
      return database('favorites');
    }
}

// {

//         "isbn": "9781250278210",
//         "title": "ABANDONED IN DEATH",
//         "description": "The 54th book of the In Death series. Eve Dallas investigates a homicide and the disappearance of other women who resemble that victim.",
//         "amazon_link": "https://www.amazon.com/dp/125027821X?tag=NYTBSREV-20",
//         "book_image": "https://storage.googleapis.com/du-prd/books/images/9781250278210.jpg",
//         "author": "J.D. Robb"
        
//     },
    // {
    
    //     "isbn": "9780525559474",
    //     "title": "THE MIDNIGHT LIBRARY",
    //     "description": "Nora Seed finds a library beyond the edge of the universe that contains books with multiple possibilities of the lives one could have lived.",
    //     "amazon_link": "https://www.amazon.com/dp/0525559477?tag=NYTBSREV-20",
    //     "book_image": "https://storage.googleapis.com/du-prd/books/images/9780525559474.jpg",
    //     "author": "Matt Haig"
     
    // },
    // {
      
    //     "isbn": "9781501171345",
    //     "title": "THE LAST THING HE TOLD ME",
    //     "description": "Hannah Hall discovers truths about her missing husband and bonds with his daughter from a previous relationship.",
    //     "amazon_link": "https://www.amazon.com/dp/1501171348?tag=NYTBSREV-20",
    //     "book_image": "https://storage.googleapis.com/du-prd/books/images/9781501171345.jpg",
    //     "author": "Laura Dave"
       
    // },