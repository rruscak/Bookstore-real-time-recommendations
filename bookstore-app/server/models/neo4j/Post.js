const _ = require('lodash');

// extracts just the data from the query results
function Post(_node) {
  _.extend(this, {
    id: _node.identity ? _node.identity.toNumber() : null,
    title: _node.properties['title'],
    content: _node.properties['content'],
  });
}

module.exports = Post;
