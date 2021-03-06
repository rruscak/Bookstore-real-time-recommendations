// Headers, CORS, Allowed Methods
module.exports = app => {
  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-Width, Content-Type, Accept, Authorization");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, PATCH, DELETE, OPTIONS");
    next();
  });
};
