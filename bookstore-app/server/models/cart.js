const dbUtils = require('../configurators/dbUtils');
const _ = require('lodash');
const CartItem = require('../models/neo4j/CartItem');

const addToCart = (session, bookId, userId) => {
  let query = [
    'MATCH (u:User)',
    'WHERE id(u) = toInteger($userId)',
    'WITH u',
    'MATCH (b:Book)',
    'WHERE id(b) = toInteger($bookId)',
    'MERGE (u)-[rel:HAS_IN_CART]->(b)',
    'ON CREATE SET rel.created = datetime(), rel.quantity = toInteger(1)',
    'ON MATCH SET rel.quantity = rel.quantity + toInteger(1)'
  ].join('\n');

  return session
    .run(query, {
      userId: userId,
      bookId: bookId
    })
    .then(result => {
      if (!result) {
        return null;
      }
      return dbUtils.getStatistics(result);
    })
};

const setBookQuantity = (session, body, userId) => {
  let query = [
    'MATCH (u:User)',
    'WHERE id(u) = toInteger($userId)',
    'WITH u',
    'MATCH (b:Book)',
    'WHERE id(b) = toInteger($bookId)',
    'MERGE (u)-[rel:HAS_IN_CART]->(b)',
    'ON CREATE SET rel.created = datetime()',
    'SET rel.quantity = toInteger($quantity)'
  ].join('\n');

  return session
    .run(query, {
      userId: userId,
      bookId: body.bookId,
      quantity: body.quantity
    })
    .then(result => {
      if (!result) {
        return null;
      }
      return dbUtils.getStatistics(result);
    })
};

const removeFromCart = (session, bookId, userId) => {
  let query = [
    "MATCH (b:Book)<-[rel:HAS_IN_CART]-(user:User)",
    "WHERE ID(b) = toInteger($bookId) AND ID(user) = toInteger($userId)",
    "DELETE rel"
  ].join('\n');

  return session
    .run(query, {
      bookId: bookId,
      userId: userId
    })
    .then(result => {
      if (!result) {
        return null;
      }
      const stats = dbUtils.getStatistics(result);
      return stats.relationshipsDeleted;
    })
};

const findBooksInCart = (session, userId) => {
  let query = [
    "MATCH (user:User)-[rel:HAS_IN_CART]->(book:Book)",
    "WHERE id(user) = toInteger($userId) AND rel.quantity > 0",
    "OPTIONAL MATCH (book)-[:HAS_IMAGE]->(i:Image)",
    "OPTIONAL MATCH (book)<-[:WRITER_OF]-(w:Writer)",
    "RETURN {id: id(book), title: book.title, writer: w.name, price: book.price, quantity: rel.quantity, image: collect(DISTINCT i)} as item",
    "ORDER BY item.title"
  ].join('\n');

  return session
    .run(query, {userId: userId})
    .then(result => {
      if (_.isEmpty(result.records))
        return null;

      return manyCartItems(result);
    })
};

const manyCartItems = (result) => {
  return result.records.map(r => new CartItem(r.get('item')));
};

const getTotalItemsInCart = (session, userId) => {
  let query = [
    "MATCH (user:User)-[rel:HAS_IN_CART]->()",
    "WHERE id(user) = toInteger($userId)",
    "RETURN sum(rel.quantity) AS total"
  ].join("\n");

  return session
    .run(query, {userId: userId})
    .then(result => result.records[0].get("total"));
};

module.exports = {
  addToCart: addToCart,
  setBookQuantity: setBookQuantity,
  removeFromCart: removeFromCart,
  findBooksInCart: findBooksInCart,
  getTotalItemsInCart: getTotalItemsInCart
};
