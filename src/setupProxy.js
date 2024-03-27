const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://202.189.224.222:9022",
      changeOrigin: true,
    })
  );
};


