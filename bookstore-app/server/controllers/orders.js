const dbUtils = require('../configurators/dbUtils');
const Orders = require('../models/orders');
const _ = require('lodash');

const Res_ = require('../configurators/response');
const ApplicationError = require('../errors/ApplicationError');

// Add to Cart
exports.createOrder = (req, res) => {
  console.log(req.userData.userId);
  const session = dbUtils.getSession(req.body);
  Orders.createOrder(session, req.userData.userId)
    .then(result => {
      if (result == null) {
        throw new ApplicationError();
      }
      if (result.nodesCreated > 0 && result.relationshipsCreated > 0) {
        console.log('CREATED');
        Res_.writeResponse(res);
      } else {
        console.log('SHOPPING CART EMPTY');
        throw new ApplicationError('Shopping cart is empty.');
      }
    })
    .catch(err => {
      console.log(err);
      Res_.writeError(res, err);
    })
    .then(() => session.close());
};
