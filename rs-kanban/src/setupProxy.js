const { createProxyMiddleware } = require('http-proxy-middleware');

export default function (app) {
  app.use(
    ['/users', '/signin', '/signup', '/boards', '/file'],
    createProxyMiddleware({
      target: 'https://rs-kanban-rest-last.herokuapp.com',
      changeOrigin: true,
      secure: false,
    })
  );
}
