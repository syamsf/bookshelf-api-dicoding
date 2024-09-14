// eslint-disable-next-line import/no-extraneous-dependencies
const Boom = require('@hapi/boom');
const Books = require('../data/books');
const SuccessResponse = require('../data/successResponse');

module.exports = async (request, handler) => {
  const { bookId } = request.params;
  if (!bookId) {
    throw Boom.badRequest('bookId is required');
  }

  const index = Books.findIndex((book) => book.id === bookId);
  if (index === -1) {
    throw Boom.notFound('Buku gagal dihapus. Id tidak ditemukan');
  }

  Books.splice(index, 1);

  const response = new SuccessResponse({
    message: 'Buku berhasil dihapus',
  });

  return handler.response(response.format()).code(200);
};
