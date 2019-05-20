const _ = require('lodash');
const dbUtils = require('../../configurators/dbUtils');

const Image = require('./Image');

function Book(_node, _details, _images) {
  _.extend(this, {
    id: dbUtils.getID(_node),
    title: _node.properties['title'],
    isbn: _node.properties['ISBN'],
    price: _node.properties['price'],
    about: _node.properties['about'],
    numOfPages: dbUtils.toNumber(_node.properties['numOfPages']),
    inStock: dbUtils.toNumber(_node.properties['inStock']),
    language: _node.properties['language'],
    releaseYear: dbUtils.toNumber(_node.properties['releaseYear']),
    weight: _node.properties['weight'],

    publisher: _details[0].publisher,
    writer: _details[0].writer,
    category: _details[0].category,
    genre: _details[0].genre,
    rating: _details[0].rating ? _details[0].rating : 0,

    images: _images.map((image => new Image(image)))
  });
}

module.exports = Book;
