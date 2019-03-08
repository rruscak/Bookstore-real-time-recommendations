// neo4j cypher helper module
// import * as _ from "lodash";
const _ = require('lodash');

let neo4j = require('neo4j-driver').v1;
// let driver = neo4j.driver(conf.get('neo4j-local'), neo4j.auth.basic(conf.get('USERNAME'), conf.get('PASSWORD')));
const driver = neo4j.driver("bolt://localhost", neo4j.auth.basic("neo4j", "admin"));

exports.getSession = (context) => {
  if (context.neo4jSession) {
    return context.neo4jSession;
  } else {
    context.neo4jSession = driver.session();
    return context.neo4jSession;
  }
};

exports.dbWhere = (name, keys) => {
  if (_.isArray(name)) {
    _.map(name, (obj) => {
      return whereTemplate(obj.name, obj.key, obj.paramKey);
    });
  } else if (keys && keys.length) {
    return 'WHERE ' + _.map(keys, (key) => {
      return whereTemplate(name, key);
    }).join(' AND ');
  }
};

let whereTemplate = (name, key, paramKey) => {
  return name + '.' + key + '={' + (paramKey || key) + '}';
};
