const Books = require('../data/books');
const SuccessResponse = require('../data/successResponse');

module.exports = async (request, handler) => {
  const { name, reading, finished } = request.query;

  let tempBooks = Books;

  if (name) {
    tempBooks = tempBooks.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()));
  }

  if (reading && (parseInt(reading, 10) === 0 || parseInt(reading, 10) === 1)) {
    const readingBool = parseInt(reading, 10) === 1;
    tempBooks = tempBooks.filter((book) => book.reading === readingBool);
  }

  if (finished && (parseInt(finished, 10) === 0 || parseInt(finished, 10) === 1)) {
    const finishedBool = parseInt(finished, 10) === 1;
    tempBooks = tempBooks.filter((book) => book.finished === finishedBool);
  }

  const books = tempBooks.map((book) => ({
    id: book.id,
    name: book.name,
    publisher: book.publisher,
  }));

  const response = new SuccessResponse({
    data: { books },
  });

  return handler.response(response.format()).code(200);
};
