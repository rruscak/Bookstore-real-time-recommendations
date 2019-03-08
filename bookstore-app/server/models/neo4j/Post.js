const _ = require('lodash');

// extracts just the data from the query results
function Post(_node) {
  _.extend(this, {
    id: _node.properties['id'],
    title: _node.properties['title'],
    content: _node.properties['content'],
  });
}

module.exports = Post;

// module.exports.add = (post, callback) => {
//   console.log("a1");
// };

