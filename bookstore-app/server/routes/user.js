const dbUtils = require('../configurators/dbUtils');
const writeResponse = require('../configurators/response').writeResponse;
const writeError = require('../configurators/response').writeError;
const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

const BadRequestError = require('../errors/BadRequestError');

// Sing Up
router.post("/signup", (req, res, next) => {
  if (!_.get(req.body, 'email') ||
    !_.get(req.body, 'firstName') ||
    !_.get(req.body, 'lastName') ||
    !_.get(req.body, 'password')) {
    return writeError(res, new BadRequestError());
  }

  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      req.body.password = hash;

      const session = dbUtils.getSession(req.body);
      User.create(session, req.body)
        .then(data => {
          console.log(data);
          writeResponse(res)
        })
        .catch((err) => {
          console.log(err);
          return writeError(res, err);
        })
        .then(() => session.close())
    });
});

// Log In
router.post("/login", (req, res, next) => {
  const email = _.get(req.body, 'email');
  const password = _.get(req.body, 'password');

  if (!email || !password) {
    return writeError(res, new BadRequestError());
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
      writeResponse(res, {
        token: token,
        expiresIn: 3600,
        userId: user.id
      });
    })
    .catch((err) => {
      console.log(err);
      return writeError(res, err);
    })
    .then(() => session.close())
});


module.exports = router;
