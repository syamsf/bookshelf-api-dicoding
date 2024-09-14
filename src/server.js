/* eslint-disable no-console */
const Hapi = require('@hapi/hapi');
const booksRoutes = require('./config/books.routes');

require('dotenv').config();

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 9000,
    host: 'localhost',
  });

  server.ext('onPreResponse', (request, h) => {
    const { response } = request;

    if (response.isBoom) {
      return h.response({
        status: response.output.status || 'fail',
        message: response.message || 'There\'s some error',
      }).code(response.output.statusCode);
    }

    response.type('application/json');

    return h.continue;
  });

  await server.register({
    name: 'books',
    register: (localServer) => {
      localServer.route(booksRoutes);
    },
  }, { routes: { prefix: '/books' } });

  await server.start();

  console.log(`Server running on ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
