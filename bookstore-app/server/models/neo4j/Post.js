const _ = require('lodash');
const dbUtils = require('../../configurators/dbUtils');

// extracts just the data from the query results
function Post(_node) {
  _.extend(this, {
    id: dbUtils.getID(_node),
    title: _node.properties['title'],
    content: _node.properties['content'],
  });
}

module.exports = Post;
