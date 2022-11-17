const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use([
    '/api/v3/ticker',
    '/api/v3/trades'
  ],
    createProxyMiddleware({
      target: 'https://api1.binance.com/',
      changeOrigin: true
    })
  );

  app.use([
    '/v1/pubticker',
    '/v1/trades'
  ],
    createProxyMiddleware({
      target: 'https://api.bitfinex.com/',
      changeOrigin: true
    })
  );

  app.use(
    '/0/public',
    createProxyMiddleware({
      target: `https://api.kraken.com/`,
      changeOrigin: true,
    })
  );
};
