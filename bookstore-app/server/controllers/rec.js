const dbUtils = require('../configurators/dbUtils');
const Books = require('../models/books');
const _ = require('lodash');

const Res_ = require('../configurators/response');
const ApplicationError = require('../errors/ApplicationError');
const BadRequestError = require('../errors/BadRequestError');

// Find filtered Books
exports.getRelatedBooks = (req, res) => {
  const limit = req.query.limit ? req.query.limit : 5;

  if (!req.params.id) {
    return Res_.writeError(res, new BadRequestError());
  }

  const session = dbUtils.getSession(req.body);

  if (req.userData) {
    Books.findRelatedBooksForUser(session, req.params.id, limit, req.userData.userId)
      .then(data => {
        return Res_.writeResponse(res, data);
      })
      .catch((err) => {
        console.log(err);
        Res_.writeError(res, err);
      })
      .then(() => session.close())
  } else {
    Books.findRelatedBooks(session, limit, req.params.id)
      .then(data => {
        return Res_.writeResponse(res, data);
      })
      .catch((err) => {
        console.log(err);
        Res_.writeError(res, err);
      })
      .then(() => session.close())
  }
};

// Find filtered Books
exports.getRecommendedBooks = (req, res) => {
  const limit = req.query.limit ? req.query.limit : 5;

  const session = dbUtils.getSession(req.body);
  Books.findRecommendedBooks(session, limit, req.userData.userId)
    .then(data => {
      console.log('AAA');
      // console.log(data);
      return Res_.writeResponse(res, data);
    })
    .catch((err) => {
      console.log(err);
      Res_.writeError(res, err);
    })
    .then(() => session.close())
};

// Find most recently viewed books
exports.getRecentlyViewedBooks = (req, res) => {
  const limit = req.query.limit ? req.query.limit : 5;
  const session = dbUtils.getSession(req.body);
  Books.findRecentlyViewed(session, limit, req.userData.userId)
    .then(data => {
      return Res_.writeResponse(res, data);
    })
    .catch((err) => {
      console.log(err);
      Res_.writeError(res, err);
    })
    .then(() => session.close())
};

// Find most recently viewed books
exports.getBestSellingBooks = (req, res) => {
  const limit = req.query.limit ? req.query.limit : 5;
  const session = dbUtils.getSession(req.body);
  Books.findBestSellingBooks(session, limit)
    .then(data => {
      return Res_.writeResponse(res, data);
    })
    .catch((err) => {
      console.log(err);
      Res_.writeError(res, err);
    })
    .then(() => session.close())
};
