const _ = require('lodash');
const dbUtils = require('../../configurators/dbUtils');

const Image = require = require('./Image');

function CartItem(_node) {
  _.extend(this, {
    id: dbUtils.toNumber(_node.id),
    title: _node.title,
    writer: _node.writer,
    price: _node.price,
    quantity: dbUtils.toNumber(_node.quantity),

    images: _node.image ? _node.image.map((image => new Image(image))) : null
  });
}

module.exports = CartItem;
