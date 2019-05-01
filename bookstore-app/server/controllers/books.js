const dbUtils = require('../configurators/dbUtils');
const Books = require('../models/books');

const Res_ = require('../configurators/response');

// Get by id
exports.getBook = (req, res) => {
  const session = dbUtils.getSession(req.body);
  Books.findById(session, req.params.id)
    .then(data => {
      // console.log(data);
      Res_.writeResponse(res, data);
    })
    .catch((err) => {
      console.log(err);
      Res_.writeError(res, err);
    })
    .then(() => session.close())
};

