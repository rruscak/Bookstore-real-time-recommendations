const _ = require('lodash');
const dbUtils = require('../../configurators/dbUtils');

function User(_node) {
  _.extend(this, {
    id: dbUtils.getID(_node),
    email: _node.properties['email'],
    firstName: _node.properties['firstName'],
    lastName: _node.properties['lastName'],
    password: _node.properties['password'],
  });
}

module.exports = User;
