const dbUtils = require('../configurators/dbUtils');

const createOrder = (session, userId) => {
  let query = [
    'MATCH (user:User)-[:HAS_IN_CART]-(:Book)',
    'WHERE id(user) = toInteger($userId)',
    'CREATE (user)-[orderRel:HAS_ORDER]->(order:Order{created: datetime()})',
    'WITH user, order',
    'MATCH (user)-[cartRel:HAS_IN_CART]->(b:Book)',
    'CREATE (order)-[containsRel:CONTAINS]->(b)',
    'SET containsRel = cartRel, containsRel.purchasePrice = b.price, b.inStock = b.inStock - 1',
    'MERGE (user)-[boughtRel:BOUGHT]->(b)',
    'DELETE cartRel',
    'WITH order, sum(b.price * containsRel.quantity) AS subtotal',
    'SET order.subtotal = subtotal'
  ].join('\n');

  return session
    .run(query, {
      userId: userId,
    })
    .then(result => {
      if (!result) {
        return null;
      }
      return dbUtils.getStatistics(result);
    })
};

module.exports = {
  createOrder: createOrder
};
