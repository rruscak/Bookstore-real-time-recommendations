const _ = require('lodash');
const Genre = require('./neo4j/Genre')

const findBookFilters = (session) => {
  let query = [
    'MATCH (g:Genre)<-[:CATEGORY_OF]-(c:Category)',
    'with c, g',
    'ORDER BY g.displayOrder, c.displayOrder',
    'WITH g, collect(DISTINCT c) AS category',
    'RETURN g AS genre, category'
  ].join('\n');

  return session
    .run(query)
    .then(result => manyCategories(result));
};

const manyCategories = (result) => {
  return result.records.map(r => new Genre(r.get('genre'), r.get('category')));
};

module.exports = {
  findBookFilters: findBookFilters
};
