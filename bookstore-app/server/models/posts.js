const Post = require('../models/neo4j/Post');
const _ = require('lodash');
const dbUtils = require('../configurators/dbUtils');

const create = (session, userId, post) => {
  let query = [
    'MATCH (user:User)',
    'WHERE ID(user) = toInteger($userId)',
    'CREATE (user)-[:CREATED{ \
      created: datetime() \
    }]->(post:Post{ \
      title:{titleParam}, \
      content:{contentParam}, \
      imagePath:{imagePath} \
      })',
    'RETURN ID(post) AS postId'
  ].join('\n');

  return session
    .run(query, {
      userId: userId,
      titleParam: post.title,
      contentParam: post.content,
      imagePath: post.imagePath
    })
    .then(result => result.records[0].get("postId"));
};

const update = (session, post, userId) => {
  console.log("!!! " + post.id + " " + post.title + " " + post.content + " " + post.imagePath);
  let query = [
    'MATCH (post:Post)<-[:CREATED]-(user:User)',
    'WHERE ID(post) = toInteger($id) AND ID(user) = toInteger($userId)',
    'SET post.title = $title, post.content = $content, post.imagePath = $imagePath',
    'RETURN ID(post) AS postId'
  ].join('\n');

  return session
    .run(query, {
      id: post.id,
      title: post.title,
      content: post.content,
      imagePath: post.imagePath,
      userId: userId
    })
    .then(result => {
      if (_.isEmpty(result.records)) {
        return null;
      } else {
        return result.records[0].get("postId")
      }
    })
};

const count = (session) => {
  let query = [
    'MATCH(posts:Post)',
    'RETURN count(posts) AS count'
  ].join('\n');

  return session
    .run(query)
    .then(result => result.records[0].get("count"));
};

const findById = (session, id) => {
  let query = [
    'MATCH (post:Post)<-[:CREATED]-(user:User)',
    'WHERE ID(post) = toInteger($id)',
    'RETURN post, ID(user) AS userId'
  ].join('\n');

  return session
    .run(query, {id: id})
    .then(result => {
      if (_.isEmpty(result.records))
        return null;

      return new Post(result.records[0].get('post'), result.records[0].get("userId"));
    });
};

const findAll = (session, skip, limit) => {
  let query = [
    'MATCH (posts:Post)<-[:CREATED]-(user:User)',
    'RETURN posts, ID(user) AS userId'
  ].join('\n');

  let properties = {};
  if (skip) {
    query = query + ' SKIP $skip';
    properties.skip = skip;
  }
  if (limit) {
    query = query + ' LIMIT $limit';
    properties.limit = limit;
  }

  return session
    .run(query, properties)
    .then(result => {
      return manyPosts(result);
    });
};

const deleteById = (session, id, userId) => {
  let query = [
    "MATCH (p:Post)<-[:CREATED]-(user:User) ",
    "WHERE ID(p) = toInteger($id) AND ID(user) = toInteger($userId)",
    "OPTIONAL MATCH (p)-[r]-()",
    "DELETE r,p"
  ].join('\n');

  return session
    .run(query, {
      id: id,
      userId: userId
    })
    .then(result => {
      if (!result) {
        return null;
      }
      const stats = dbUtils.getStatistics(result);
      return stats.nodesDeleted + stats.relationshipsDeleted;
    })
};

const manyPosts = (result) => {
  return result.records.map(r => new Post(r.get('posts'), r.get("userId")));
};

module.exports = {
  create: create,
  update: update,
  count: count,
  findById: findById,
  findAll: findAll,
  deleteById: deleteById
};
