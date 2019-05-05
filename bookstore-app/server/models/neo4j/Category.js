const _ = require('lodash');
const dbUtils = require('../../configurators/dbUtils');

function Category(_node) {
  _.extend(this, {
    id: dbUtils.getID(_node),
    name: _node.properties['name'],
  });
}

module.exports = Category;
