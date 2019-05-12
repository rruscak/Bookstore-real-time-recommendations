const Book = require('../models/neo4j/Book');
const BookItem = require('../models/neo4j/BookItem');
const _ = require('lodash');

const findById = (session, id) => {
  let query = [
    'MATCH (book:Book)',
    'WHERE id(book) = toInteger($id)',
    'OPTIONAL MATCH (book)-[:HAS_IMAGE]->(i:Image)',
    'OPTIONAL MATCH (book)<-[:WRITER_OF]-(w:Writer)',
    'OPTIONAL MATCH (book)<-[:PUBLISHER_OF]-(p:Publisher)',
    'OPTIONAL MATCH (book)-[:HAS_CATEGORY]->(c:Category)',
    'OPTIONAL MATCH (c)-[:CATEGORY_OF]->(g:Genre)',
    'RETURN DISTINCT book AS book,',
    'collect(DISTINCT i) AS image,',
    'collect(DISTINCT {category: c.name, genre: g.name, writer: w.name, publisher: p.name}) AS details',
  ].join('\n');

  return session
    .run(query, {id: id})
    .then(result => {
      if (_.isEmpty(result.records))
        return null;

      return new Book(
        result.records[0].get('book'),
        result.records[0].get("details"),
        result.records[0].get("image")
      );
    });
};

const findAll = (session, genreId, catId, orderBy, orderDir, skip, limit) => {
  let properties = {};
  let conditions = '';
  if (genreId) {
    conditions = 'WHERE ID(g) = toInteger($genreId) ';
    properties.genreId = genreId;
  }
  if (catId) {
    conditions = 'WHERE ID(c) = toInteger($catId) ';
    properties.catId = catId;
  }

  let query = [
    'MATCH (book:Book)-[:HAS_CATEGORY]->(c:Category)-[:CATEGORY_OF]->(g:Genre)',
    conditions,
    'OPTIONAL MATCH (book)-[:HAS_IMAGE]->(i:Image)',
    'OPTIONAL MATCH (book)<-[:WRITER_OF]-(w:Writer)',
    'OPTIONAL MATCH (book)<-[:PUBLISHER_OF]-(p:Publisher)',
    'RETURN',
    '{id: id(book), title: book.title, writer: w.name, price: book.price, releaseYear: book.releaseYear, image: collect(DISTINCT i)} AS book'
  ].join('\n');

  // Ordering
  switch (orderBy) {
    case 'name':
      query += ' ORDER BY book.title ';
      break;
    case 'price':
      query += ' ORDER BY book.price ';
      break;
    case 'date':
      query += ' ORDER BY book.releaseYear ';
      break;
  }
  if (orderDir) {
    query += orderDir;
  }
  // Pagination
  if (skip) {
    query += ' SKIP $skip';
    properties.skip = skip;
  }
  if (limit) {
    query += ' LIMIT $limit';
    properties.limit = limit;
  }

  return session
    .run(query, properties)
    .then(result => {
      if (_.isEmpty(result.records))
        return null;

      // console.log(result.records[0].get('book'));
      return manyBooksItems(result);
    });
};

const manyBooksItems = (result) => {
  return result.records.map(r => new BookItem(r.get('book')));
};

const count = (session, genreId, catId) => {
  let properties = {};
  let conditions = '';
  if (genreId) {
    conditions = 'WHERE ID(g) = toInteger($genreId) ';
    properties.genreId = genreId;
  }
  if (catId) {
    conditions = 'WHERE ID(c) = toInteger($catId) ';
    properties.catId = catId;
  }
  let query = [
    'MATCH(books:Book)-[:HAS_CATEGORY]->(c:Category)-[:CATEGORY_OF]->(g:Genre)',
    conditions,
    'RETURN count(books) AS count'
  ].join('\n');

  return session
    .run(query, properties)
    .then(result => result.records[0].get("count"));
};

module.exports = {
  findById: findById,
  findAll: findAll,
  count: count
};
