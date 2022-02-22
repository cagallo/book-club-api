const books = require('./books-data');

const generateAllBooks = (books) => {
  return books.map(book => {
    const {
      primary_isbn13, title, description, amazon_product_url, author, book_image
    } = book;
    return  {
      id: primary_isbn13,
      title: title,
      description: description,
      amazonLink: amazon_product_url,
      author: author,
      bookImage: book_image
    }
  })
}
