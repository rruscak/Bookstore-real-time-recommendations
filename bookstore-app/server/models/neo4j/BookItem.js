const _ = require('lodash');
const dbUtils = require('../../configurators/dbUtils');

const Image = require('./Image');

function BookItem(_node) {
  _.extend(this, {
    id: dbUtils.toNumber(_node.id),
    title: _node.title,
    writer: _node.writer,
    price: _node.price,
    rating: _node.rating ? _node.rating : 0,

    images: _node.image ? _node.image.map((image => new Image(image))) : null
  });
}

module.exports = BookItem;
