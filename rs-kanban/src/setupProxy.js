const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    ['/users', '/signin', '/signup', '/boards', '/file'],
    createProxyMiddleware({
      target: 'https://team-23.herokuapp.com',
      changeOrigin: true,
      secure: false,
    })
  );
};
