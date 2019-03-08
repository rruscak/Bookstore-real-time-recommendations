const Post = require('../models/neo4j/Post');

let create = function (session, post) {
  let query = [
    'CREATE(post:Post{ \
      title:{titleParam}, \
      content:{contentParam} \
      })',
    'RETURN post'
  ].join('\n');

  return session
    .run(query, {
      titleParam: post.title,
      contentParam: post.content
    })
};

let getAll = function (session) {
  let query = [
    'MATCH(posts:Post)',
    'RETURN posts LIMIT 10'
  ].join('\n');

  return session
    .run(query)
    .then((result) => {
      // console.log(result);
      // result.map(r => console.log(r));
      return manyPosts(result);
    });
};

let manyPosts = (result) => {
  // console.log(result.records[0]);
  return result.records.map(r => new Post(r._fields[0]));
  // return {
  //   posts: result.records.map(r => new Post(r._fields[0]))
  // };
};

module.exports = {
  create: create,
  getAll: getAll
};
