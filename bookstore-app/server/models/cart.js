const dbUtils = require('../configurators/dbUtils');

const addToCart = (session, body, userId) => {
  let query = [
    'MATCH (u:User)',
    'WHERE id(u) = toInteger($userId)',
    'WITH u',
    'MATCH (b:Book)',
    'WHERE id(b) = toInteger($bookId)',
    'MERGE (u)-[:HAS_IN_CART]->(b)',
    'ON CREATE SET rel.created = datetime()',
    'SET rel.quantity = toInteger($quantity)',
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

const removeBookById = (session, bookId, userId) => {
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

module.exports = {
  addToCart: addToCart,
  removeBookById: removeBookById
};
