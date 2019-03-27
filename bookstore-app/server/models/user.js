const User = require('../models/neo4j/User');
const dbUtils = require('../configurators/dbUtils');
const _ = require('lodash');

const create = (session, user) => {
  let query = [
    'CREATE(user:User{ \
      email:$email, \
      firstName:$firstName, \
      lastName:$lastName, \
      password:$password \
    })',
    'RETURN ID(user) AS userId'
  ].join('\n');

  return session
    .run(query, {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      password: user.password
    })
    .then(result => result.records[0].get("userId"))
    .catch(err => {
      if (_.isEqual(err.code, dbUtils.errorCodes.CONSTRAINT_VALIDATION)) {
        throw {
          message: 'Account with this email already exists.',
          status: 409
        };
      }
      throw err;
    });
};

const findByEmail = (session, email) => {
  let query = [
    'MATCH(user:User{ \
      email:$email \
    })',
    'RETURN user'
  ].join('\n');

  return session
    .run(query, {
      email: email,
    })
    .then(result => {
      if (_.isEmpty(result.records)) {
        return null;
      } else {
        return new User(result.records[0].get("user"));
      }
    });
};

module.exports = {
  create: create,
  findByEmail: findByEmail,
};
