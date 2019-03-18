const Post = require('../models/neo4j/Post');
const _ = require('lodash');

const create = (session, post) => {
  let query = [
    'MERGE(post:Post{ \
      title:{titleParam}, \
      content:{contentParam}, \
      imagePath:{imagePath} \
      })',
    'RETURN ID(post) AS postId'
  ].join('\n');

  return session
    .run(query, {
      titleParam: post.title,
      contentParam: post.content,
      imagePath: post.imagePath
    })
    .then(result => result.records[0].get("postId"));
};

const update = (session, post) => {
  console.log("!!! " + post.id + " " + post.title + " " + post.content + " " + post.imagePath);
  let query = [
    'MATCH (post:Post)',
    'WHERE ID(post) = toInteger($id)',
    'SET post.title = $title, post.content = $content, post.imagePath = $imagePath',
    'RETURN ID(post) AS postId'
  ].join('\n');

  return session
    .run(query, {
      id: post.id,
      title: post.title,
      content: post.content,
      imagePath: post.imagePath
    })
    .then(result => result.records[0].get("postId"))
};

const findById = (session, id) => {
  let query = [
    'MATCH (post:Post)',
    'WHERE ID(post) = toInteger($id)',
    'RETURN post'
  ].join('\n');

  return session
    .run(query, {id: id})
    .then(result => {
      if (_.isEmpty(result.records))
        return null;

      return new Post(result.records[0].get('post'))
    });
};

const findAll = session => {
  let query = [
    'MATCH(posts:Post)',
    'RETURN posts'
  ].join('\n');

  return session
    .run(query)
    .then(result => {
      return manyPosts(result);
    });
};

const deleteById = (session, id) => {
  let query = [
    "MATCH (p:Post) where ID(p)=toInteger($id)",
    "OPTIONAL MATCH (p)-[r]-()",
    "DELETE r,p"
  ].join('\n');

  return session
    .run(query, {id: id})
};

const manyPosts = (result) => {
  return result.records.map(r => new Post(r.get('posts')));
};

module.exports = {
  create: create,
  update: update,
  findById: findById,
  findAll: findAll,
  deleteById: deleteById
};
