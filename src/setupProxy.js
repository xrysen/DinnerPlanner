const proxy = require("http-proxy-middleware");
const ENDPOINT = "http://localhost:8080";

module.exports = app => {
  app.use(proxy("/api/*", { target: ENDPOINT }));
}