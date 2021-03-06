// neo4j cypher helper module
const _ = require('lodash');

let neo4j = require('neo4j-driver').v1;
const driver = neo4j.driver(process.env.NEO4J_URL, neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD));

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

exports.getID = _node => {
  if (_node.identity == null) {
    return null;
  }
  return _node.identity.inSafeRange() ? _node.identity.toNumber() : _node.identity.toString();
};

exports.toNumber = integerVal => {
  if (integerVal == null) {
    return null;
  }
  if (typeof integerVal == 'number') {
    return integerVal;
  }
  return integerVal.inSafeRange() ? integerVal.toNumber() : integerVal.toString();
};

exports.getStatistics = result => result != null ? result.summary.updateStatistics._stats : null;


const whereTemplate = (name, key, paramKey) => {
  return name + '.' + key + '={' + (paramKey || key) + '}';
};

exports.errorCodes = {
  CONSTRAINT_VALIDATION: 'Neo.ClientError.Schema.ConstraintValidationFailed'
};

// // const session = driver.getSession();
// const tx = session.beginTransaction();
// tx.run(
//   "CREATE (user:User { name: {name} }) RETURN user",
//   {name: "Alex"})
//   .then(res => {
//     // Dalšie query s tx...
//   })
//   .then((result) => {
//     // OK, tranzakcia bude commitnuta...
//   })
//   .catch(e => {
//     // Tranzakica bude vrátená späť, spracovanie chyby...
//   });
//
//
// const session = driver.getSession();
// session.run("MATCH (user:User) RETURN user.name AS name")
//   .subscribe({
//     onNext: (record) => {
//       console.log(record.get('name')); // Skonzumuje objekt
//     },
//     onCompleted: () => {
//       session.close();    // Zatvorí session ked stream je kompletný
//     },
//     onError: (error) => {
//       console.log(error); // Spracovanie chyby
//     }
//   });
