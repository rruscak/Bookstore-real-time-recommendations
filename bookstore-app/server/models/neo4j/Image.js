const _ = require('lodash');
const dbUtils = require('../../configurators/dbUtils');

function Image(_node) {
  _.extend(this, {
    id: dbUtils.getID(_node),
    name: _node.properties['name'],
    path: _node.properties['path']
  });
}

module.exports = Image;
