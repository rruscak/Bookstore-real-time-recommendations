const jwt = require('jsonwebtoken');
const writeResponse = require('../configurators/response').writeResponse;

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, 'pwlmavuutrylzaroeihfwsadpioqwehinsotnnirtevcw');
    req.userData = {
      email: decodedToken.email,
      userId: decodedToken.userId
    };
    next();
  } catch (err) {
    writeResponse(res, {message: 'You are not authenticated!'}, 401)
  }
};
