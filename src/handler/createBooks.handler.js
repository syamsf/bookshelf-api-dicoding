// eslint-disable-next-line import/no-extraneous-dependencies
const Boom = require('@hapi/boom');
const { nanoid } = require('nanoid');
const Books = require('../data/books');
const BookData = require('../data/bookData');
const SuccessResponse = require('../data/successResponse');

module.exports = async (request, handler) => {
  const body = request.payload;
  if (!body.name) {
    throw Boom.badRequest('Gagal menambahkan buku. Mohon isi nama buku');
  }

  if (body.readPage > body.pageCount) {
    throw Boom.badRequest('Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount');
  }

  const id = nanoid();
  const createdAt = new Date().toISOString();
  Books.push(new BookData({
    id,
    name: body.name,
    year: body.year,
    author: body.author,
    summary: body.summary,
    publisher: body.publisher,
    pageCount: body.pageCount,
    readPage: body.readPage,
    reading: body.reading,
    finished: body.pageCount === body.readPage,
    insertedAt: createdAt,
    updatedAt: createdAt,
  }));

  const response = new SuccessResponse({
    message: 'Buku berhasil ditambahkan',
    data: {
      bookId: id,
    },
  });

  return handler.response(response.format()).code(201);
};
