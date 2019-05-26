const dbUtils = require('../configurators/dbUtils');
const Books = require('../models/books');
const _ = require('lodash');

const Res_ = require('../configurators/response');
const ApplicationError = require('../errors/ApplicationError');
const BadRequestError = require('../errors/BadRequestError');

// Get by id
exports.getBook = (req, res) => {
  const session = dbUtils.getSession(req.body);
  let bookData;
  Books.findById(session, req.params.id)
    .then(data => {
      console.log(req.userData);
      if (!req.userData) {
        return Res_.writeResponse(res, data);
      }
      bookData = data;
      return Books.mergeViewed(session, req.params.id, req.userData.userId)
    })
    .then(result => {
      console.log(result);
      return Res_.writeResponse(res, bookData);
    })
    .catch((err) => {
      console.log(err);
      Res_.writeError(res, err);
    })
    .then(() => session.close())
};

// Find filtered Books
exports.getAllBooks = (req, res) => {
  // Filtering
  const genreId = +req.query.genreId;
  const categoryId = +req.query.categoryId;
  // Ordering
  const orderBy = req.query.orderBy;
  const orderDir = req.query.orderDir;
  // Pagination
  const limit = +req.query.limit;
  const page = +req.query.page;
  let skip;
  if (limit && page) {
    skip = limit * (page - 1)
  }

  let books;
  const session = dbUtils.getSession(req.body);
  Books.findAll(session, genreId, categoryId, orderBy, orderDir, skip, limit)
    .then(data => {
      // console.log(data);
      books = data;
      return Books.count(session, genreId, categoryId);
    })
    .then(count => {
      Res_.writeResponse(res, {
        books: books,
        count: dbUtils.toNumber(count)
      });
    })
    .catch((err) => {
      console.log(err);
      Res_.writeError(res, err);
    })
    .then(() => session.close())
};

exports.rateBook = (req, res) => {
  if (!_.get(req.body, 'bookId') ||
    !_.get(req.body, 'rating')) {
    return Res_.writeError(res, new BadRequestError());
  }

  const session = dbUtils.getSession(req.body);
  Books.rateBook(session, req.body, req.userData.userId)
    .then(result => {
      if (result == null) {
        throw new ApplicationError();
      }
      if (result.propertiesSet === 0) {
        throw new ApplicationError();
      }
      Res_.writeResponse(res, {
        rating: dbUtils.toNumber(result)
      });
    })
    .catch((err) => {
      console.log(err);
      Res_.writeError(res, err);
    })
    .then(() => session.close())
};
