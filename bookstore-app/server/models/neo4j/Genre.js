const _ = require('lodash');
const dbUtils = require('../../configurators/dbUtils');

const Category = require('./Category');

function Genre(_node, categories) {
  _.extend(this, {
    id: dbUtils.getID(_node),
    name: _node.properties['name'],
    categories: categories.map((category => new Category(category)))
  });
}

module.exports = Genre;
