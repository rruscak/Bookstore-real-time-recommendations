const Book = require('../models/neo4j/Book');
const BookItem = require('../models/neo4j/BookItem');
const dbUtils = require('../configurators/dbUtils');
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
    'OPTIONAL MATCH (:User)-[ratRel:RATED]->(book)',
    'WITH i, c, g, w, p, book, avg(ratRel.rating) AS rating',
    'RETURN DISTINCT book AS book,',
    'collect(DISTINCT i) AS image,',
    'collect(DISTINCT {category: c.name, genre: g.name, writer: w.name, publisher: p.name, rating: rating}) AS details',
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
    'OPTIONAL MATCH (:User)-[ratRel:RATED]->(book)',
    'WITH i, w, book, avg(ratRel.rating) AS rating',
    'RETURN',
    '{id: id(book), title: book.title, writer: w.name, price: book.price, releaseYear: book.releaseYear, rating: rating, image: collect(DISTINCT i)} AS book'
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
    case 'rating':
      query += ' ORDER BY book.rating ';
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

const rateBook = (session, body, userId) => {
  let query = [
    'MATCH (u:User)',
    'WHERE id(u) = toInteger($userId)',
    'WITH u',
    'MATCH (b:Book)',
    'WHERE id(b) = toInteger($bookId)',
    'MERGE (u)-[rel:RATED]->(b)',
    'ON CREATE SET rel.created = datetime(), rel.count = 1',
    'ON MATCH SET rel.updated = datetime(), rel.count = rel.count + 1',
    'SET rel.rating = toInteger($rating)'
  ].join('\n');

  return session
    .run(query, {
      userId: userId,
      bookId: body.bookId,
      rating: body.rating
    })
    .then(result => {
      if (!result) {
        return null;
      }
      return dbUtils.getStatistics(result);
    })
};

module.exports = {
  findById: findById,
  findAll: findAll,
  count: count,
  rateBook: rateBook
};
