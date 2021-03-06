const _ = require('lodash');
const dbUtils = require('../../configurators/dbUtils');

// extracts just the data from the query results
function Post(_node, userId) {
  _.extend(this, {
    id: dbUtils.getID(_node),
    title: _node.properties['title'],
    content: _node.properties['content'],
    imagePath: _node.properties['imagePath'],
    userId: dbUtils.toNumber(userId)
  });
}

module.exports = Post;
