// eslint-disable-next-line import/no-extraneous-dependencies
const Boom = require('@hapi/boom');
const Books = require('../data/books');
const SuccessResponse = require('../data/successResponse');
const BookData = require('../data/bookData');

module.exports = async (request, handler) => {
  const { bookId } = request.params;
  if (!bookId) {
    throw Boom.badRequest('bookId is required');
  }

  const index = Books.findIndex((book) => book.id === bookId);
  if (index === -1) {
    throw Boom.notFound('Gagal memperbarui buku. Id tidak ditemukan');
  }

  const body = request.payload;
  if (body.readPage > body.pageCount) {
    throw Boom.badRequest('Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount');
  }

  if (!body.name) {
    throw Boom.badRequest('Gagal memperbarui buku. Mohon isi nama buku');
  }

  Books[index] = new BookData({
    id: Books[index].id,
    name: body.name,
    year: body.year,
    author: body.author,
    summary: body.summary,
    publisher: body.publisher,
    pageCount: body.pageCount,
    readPage: body.readPage,
    reading: body.reading,
    finished: body.pageCount === body.readPage,
    insertedAt: Books[index].insertedAt,
    updatedAt: new Date().toISOString(),
  });

  const response = new SuccessResponse({
    message: 'Buku berhasil diperbarui',
  });

  return handler.response(response.format()).code(200);
};
