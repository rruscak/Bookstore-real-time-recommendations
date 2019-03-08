module.exports = app => {
  const morgan  = require('morgan');

  app.use(morgan('combined'));
};
