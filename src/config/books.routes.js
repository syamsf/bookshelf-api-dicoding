const createBooks = require('../handler/createBooks.handler');
const fetchAllBooks = require('../handler/fetchAllBooks.handler');
const fetchBookById = require('../handler/fetchBookById.handler');
const updateBookById = require('../handler/updateBookById.handler');
const deleteBookById = require('../handler/deleteBookById.handler');

const booksRoutes = [
  {
    method: 'POST',
    path: '/',
    handler: createBooks,
  },
  {
    method: 'GET',
    path: '/',
    handler: fetchAllBooks,
  },
  {
    method: 'GET',
    path: '/{bookId}',
    handler: fetchBookById,
  },
  {
    method: 'PUT',
    path: '/{bookId}',
    handler: updateBookById,
  },
  {
    method: 'DELETE',
    path: '/{bookId}',
    handler: deleteBookById,
  },
];

module.exports = booksRoutes;
