const dbUtils = require('../configurators/dbUtils');
const Books = require('../models/books');
const _ = require('lodash');

const Res_ = require('../configurators/response');
const ApplicationError = require('../errors/ApplicationError');
const BadRequestError = require('../errors/BadRequestError');

// Find filtered Books
exports.getRelatedBooks = (req, res) => {
  if (!req.params.id) {
    return Res_.writeError(res, new BadRequestError());
  }

  const session = dbUtils.getSession(req.body);

  if (req.userData) {
    Books.findRelatedBooksForUser(session, req.params.id, req.userData.userId)
      .then(data => {
        // console.log(data);
        return Res_.writeResponse(res, data);
      })
      .catch((err) => {
        console.log(err);
        Res_.writeError(res, err);
      })
      .then(() => session.close())
  } else {
    Books.findRelatedBooks(session, req.params.id)
      .then(data => {
        // console.log(data);
        return Res_.writeResponse(res, data);
      })
      .catch((err) => {
        console.log(err);
        Res_.writeError(res, err);
      })
      .then(() => session.close())
  }

};
