const jwt = require('jsonwebtoken');
const writeResponse = require('../configurators/response').writeResponse;

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, 'pwlmavuutrylzaroeihfwsadpioqwehinsotnnirtevcw');
    next();
  } catch (err) {
    writeResponse(res, {message: 'Authentication failed.'}, 401)
  }
};
