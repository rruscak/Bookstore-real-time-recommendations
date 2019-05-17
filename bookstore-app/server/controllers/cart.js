const dbUtils = require('../configurators/dbUtils');
const Cart = require('../models/cart');
const _ = require('lodash');

const Res_ = require('../configurators/response');
const BadRequestError = require('../errors/BadRequestError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const ApplicationError = require('../errors/ApplicationError');

// Add to Cart
exports.addToCart = (req, res) => {
  if (!_.get(req.body, 'bookId') ||
    !_.get(req.body, 'quantity')) {
    return Res_.writeError(res, new BadRequestError());
  }

  const session = dbUtils.getSession(req.body);
  Cart.addToCart(session, req.body, req.userData.userId)
    .then(result => {
      if (result == null) {
        throw new ApplicationError();
      }
      if (result === 0) {
        Res_.writeResponse(res, null, 304);
      }
      if (result.relationshipsCreated === 1) {
        Res_.writeResponse(res, null, 201);
      } else {
        Res_.writeResponse(res);
      }
    })
    .catch((err) => {
      console.log(err);
      Res_.writeError(res, err);
    })
    .then(() => session.close())
};

// Remove from Cart
exports.RemoveFromCart = (req, res) => {
  const session = dbUtils.getSession(req.body);
  Cart.removeBookById(session, req.params.id, req.userData.userId)
    .then(result => {
      if (result == null) {
        throw new ApplicationError();
      }
      console.log(result);
      if (result === 0) {
        throw new UnauthorizedError();
      }
      Res_.writeResponse(res);
    })
    .catch((err) => {
      console.log(err);
      Res_.writeError(res, err);
    })
    .then(() => session.close())
};
