const dbUtils = require('../configurators/dbUtils');
const Cart = require('../models/cart');
const _ = require('lodash');

const Res_ = require('../configurators/response');
const BadRequestError = require('../errors/BadRequestError');
const ApplicationError = require('../errors/ApplicationError');

// Add to Cart
exports.addToCart = (req, res) => {
  const session = dbUtils.getSession(req.body);
  Cart.addToCart(session, req.params.id, req.userData.userId)
    .then(result => {
      if (result == null) {
        throw new ApplicationError();
      }
      return Cart.getTotalItemsInCart(session, req.userData.userId);
    })
    .then(count => {
      Res_.writeResponse(res, {
        totalInCart: dbUtils.toNumber(count)
      });
    })
    .catch(err => {
      console.log(err);
      Res_.writeError(res, err);
    })
    .then(() => session.close());
};

// Add to Cart
exports.setQuantity = (req, res) => {
  if (!_.get(req.body, 'bookId')) {
    return Res_.writeError(res, new BadRequestError());
  }

  const session = dbUtils.getSession(req.body);
  Cart.setBookQuantity(session, req.body, req.userData.userId)
    .then(result => {
      if (result == null) {
        throw new ApplicationError();
      }
      // if (result === 0) {
      //   Res_.writeResponse(res, null, 304);
      // }
      // if (result.relationshipsCreated === 1) {
      //   Res_.writeResponse(res, null, 201);
      // } else {
      //   Res_.writeResponse(res);
      // }
      return Cart.getTotalItemsInCart(session, req.userData.userId);
    })
    .then(count => {
      Res_.writeResponse(res, {
        totalInCart: dbUtils.toNumber(count)
      });
    })
    .catch(err => {
      console.log(err);
      Res_.writeError(res, err);
    })
    .then(() => session.close());
};

// Remove from Cart
exports.removeFromCart = (req, res) => {
  const session = dbUtils.getSession(req.body);
  Cart.removeBookById(session, req.params.id, req.userData.userId)
    .then(result => {
      if (result == null) {
        throw new ApplicationError();
      }
      console.log(result);
      Res_.writeResponse(res);
    })
    .catch(err => {
      console.log(err);
      Res_.writeError(res, err);
    })
    .then(() => session.close());
};

exports.listCart = (req, res) => {
  const session = dbUtils.getSession(req.body);
  Cart.findBooksInCart(session, req.userData.userId)
    .then(result => {
      if (result == null) {
        throw new ApplicationError();
      }
      console.log(result);
      Res_.writeResponse(res, result);
    })
    .catch(err => {
      console.log(err);
      Res_.writeError(res, err);
    })
    .then(() => session.close());
};
