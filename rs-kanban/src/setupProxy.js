const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    ['/users', '/signin', '/signup', '/boards', '/file', '/search'],
    createProxyMiddleware({
      target: 'https://rs-kanban-rest-last.herokuapp.com',
      changeOrigin: true,
      secure: false,
    })
  );
};
