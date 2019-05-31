const dbUtils = require('../configurators/dbUtils');
const Filters = require('../models/filters');

const Res_ = require('../configurators/response');

exports.getBookFilters = (req, res) => {
  const session = dbUtils.getSession(req.body);
  Filters.findBookFilters(session)
    .then(data => {
      Res_.writeResponse(res, data);
    })
    .catch((err) => {
      console.log(err);
      Res_.writeError(res, err);
    })
    .then(() => session.close())
};
