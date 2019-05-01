const Book = require('../models/neo4j/Book');
const Image = require('../models/neo4j/Image');
const _ = require('lodash');
const dbUtils = require('../configurators/dbUtils');

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

module.exports = {
  findById: findById
};
