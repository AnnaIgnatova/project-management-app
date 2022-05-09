const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    ['/users', '/signin', '/signup', '/boards', '/file'],
    createProxyMiddleware({
      target: 'https://rs-kanban-rest.herokuapp.com',
      changeOrigin: true,
      secure: false,
    })
  );
};
