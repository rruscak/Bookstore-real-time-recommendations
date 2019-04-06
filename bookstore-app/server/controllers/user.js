const dbUtils = require('../configurators/dbUtils');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

const Res_ = require('../configurators/response');
const BadRequestError = require('../errors/BadRequestError');

// Sing Up
exports.createUser = (req, res) => {
  if (!_.get(req.body, 'email') ||
    !_.get(req.body, 'firstName') ||
    !_.get(req.body, 'lastName') ||
    !_.get(req.body, 'password')) {
    return Res_.writeError(res, new BadRequestError());
  }

  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      req.body.password = hash;

      const session = dbUtils.getSession(req.body);
      User.create(session, req.body)
        .then(data => {
          console.log(data);
          Res_.writeResponse(res)
        })
        .catch((err) => {
          console.log(err);
          return Res_.writeError(res, err);
        })
        .then(() => session.close())
    });
};

// Log In
exports.logIn = (req, res) => {
  const email = _.get(req.body, 'email');
  const password = _.get(req.body, 'password');

  if (!email || !password) {
    return Res_.writeError(res, new BadRequestError());
  }

  let user;
  const session = dbUtils.getSession(req.body);
  User.findByEmail(session, email)
    .then(data => {
      if (!data) {
        throw {
          message: 'No User was found with that email.',
          status: 403
        };
      }
      user = data;
      return bcrypt.compare(password, user.password)
    })
    .then(result => {
      if (!result) {
        throw {
          message: 'Incorrect password.',
          status: 403
        };
      }
      const token = jwt.sign({
          email: email,
          userId: user.id
        }, 'pwlmavuutrylzaroeihfwsadpioqwehinsotnnirtevcw', {
          expiresIn: "1h"
        }
      );
      Res_.writeResponse(res, {
        token: token,
        expiresIn: 3600,
        userId: user.id
      });
    })
    .catch((err) => {
      console.log(err);
      return Res_.writeError(res, err);
    })
    .then(() => session.close())
};
