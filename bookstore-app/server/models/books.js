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

// Get total books of an CATEGORY or GENRE
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

// CREATE or UPDATE book rating of an user
const rateBook = (session, body, userId) => {
  let query = [
    'MATCH (u:User)',
    'WHERE id(u) = toInteger($userId)',
    'WITH u',
    'MATCH (b:Book)',
    'WHERE id(b) = toInteger($bookId)',
    'WITH u, b',
    'OPTIONAL MATCH ()-[ratings:RATED]->(b)',
    'MERGE (u)-[rel:RATED]->(b)',
    'ON CREATE SET rel.created = datetime(), rel.count = 1',
    'ON MATCH SET rel.updated = datetime(), rel.count = rel.count + 1',
    'SET rel.rating = toInteger($rating)',
    'RETURN',
    'CASE',
    'WHEN ratings IS NULL THEN rel.rating',
    'ELSE avg(ratings.rating)',
    'END AS rating'
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
      return result.records[0].get("rating");
    })
};

/**
 * Create or update :VIEWED relationship between user and book
 * @param session
 * @param bookId
 * @param userId
 * @returns {*} Result statistics of query
 */
const mergeViewed = (session, bookId, userId) => {
  let query = [
    'MATCH (user:User)',
    'WHERE id(user) = toInteger($userId)',
    'WITH user',
    'MATCH (book:Book)',
    'WHERE id(book) = toInteger($bookId)',
    'MERGE (user)-[view:VIEWED]->(book)',
    'ON CREATE SET view.created = datetime(), view.count = 1',
    'ON MATCH SET view.updated = datetime(), view.count = view.count + 1'
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
      return dbUtils.getStatistics(result).propertiesSet;
    })
};

/**
 * Find related books to input book.
 * @param session
 * @param bookId
 * @returns {*} BookItem list
 */
const findRelatedBooks = (session, bookId) => {
  let query = [
    'MATCH (b1:Book)-[:HAS_CATEGORY]->(cat1:Category)',
    'WHERE id(b1) = 28',
    'MATCH p = (b1)-[:HAS_SEQUEL|WRITER_OF|HAS_KEYWORD|PUBLISHER_OF*..3]-(b2:Book)-[:HAS_CATEGORY]->(cat2:Category)',
    'WHERE b2 <> b1 AND cat1 = cat2',
    'WITH b2, relationships(p) AS rel',
    'OPTIONAL MATCH (b2)-[:HAS_IMAGE]->(i:Image)',
    'OPTIONAL MATCH (b2)<-[:WRITER_OF]-(w:Writer)',
    'OPTIONAL MATCH (:User)-[ratRel:RATED]->(b2)',
    'WITH b2, i, w, avg(ratRel.rating) AS rating, count(rel) AS relsInCommon',
    'RETURN {id: id(b2), title: b2.title, writer: w.name, price: b2.price, rating: rating, image: collect(DISTINCT i), relsInCommon: relsInCommon} AS book',
    'ORDER BY book.relsInCommon DESC, book.title',
    'LIMIT 5',
  ].join('\n');

  return session
    .run(query, {bookId: bookId})
    .then(result => {
      if (_.isEmpty(result.records))
        return null;

      // console.log(result.records[0].get('book'));
      return manyBooksItems(result);
    });
};

/**
 * Find related books to input book without the books user already bought or has in cart.
 * @param session
 * @param bookId
 * @param userId
 * @returns {*} BookItem list
 */
const findRelatedBooksForUser = (session, bookId, userId) => {
  let query = [
    'MATCH (user:User)',
    'WHERE id(user) = toInteger($userId)',
    'WITH user',
    'MATCH (b1:Book)-[:HAS_CATEGORY]->(cat1:Category)',
    'WHERE id(b1) = toInteger($bookId)',
    'MATCH p = (b1)-[:HAS_SEQUEL|WRITER_OF|HAS_KEYWORD|PUBLISHER_OF*..3]-(b2:Book)-[:HAS_CATEGORY]->(cat2:Category)',
    'WHERE NOT (user)-[:HAS_IN_CART]->(b2) AND b2 <> b1 AND cat1 = cat2',
    'WITH b2, relationships(p) AS rel',
    'OPTIONAL MATCH (b2)-[:HAS_IMAGE]->(i:Image)',
    'OPTIONAL MATCH (b2)<-[:WRITER_OF]-(w:Writer)',
    'OPTIONAL MATCH (:User)-[ratRel:RATED]->(b2)',
    'WITH b2, i, w, avg(ratRel.rating) AS rating, count(rel) AS relsInCommon',
    'RETURN {id: id(b2), title: b2.title, writer: w.name, price: b2.price, rating: rating, image: collect(DISTINCT i), relsInCommon: relsInCommon} AS book',
    'ORDER BY book.relsInCommon DESC, book.title',
    'LIMIT 5',
  ].join('\n');

  return session
    .run(query, {
      userId: userId,
      bookId: bookId
    })
    .then(result => {
      if (_.isEmpty(result.records))
        return null;

      // console.log(result.records[0].get('book'));
      return manyBooksItems(result);
    });
};

module.exports = {
  findById: findById,
  findAll: findAll,
  count: count,
  rateBook: rateBook,
  mergeViewed: mergeViewed,
  findRelatedBooks: findRelatedBooks,
  findRelatedBooksForUser: findRelatedBooksForUser
};
