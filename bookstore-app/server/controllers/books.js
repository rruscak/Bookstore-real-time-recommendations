const dbUtils = require('../configurators/dbUtils');
const Books = require('../models/books');

const Res_ = require('../configurators/response');

// Get by id
exports.getBook = (req, res) => {
  const session = dbUtils.getSession(req.body);
  Books.findById(session, req.params.id)
    .then(data => {
      // console.log(data);
      Res_.writeResponse(res, data);
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
