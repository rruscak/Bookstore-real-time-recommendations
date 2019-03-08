const dbUtils = require('../configurators/dbUtils');
const writeResponse = require('../configurators/response').writeResponse;
const Posts = require('../models/posts');

exports.new = (req, res) => {
  Posts.create(dbUtils.getSession(req.body), req.body)
    .then(data => {
      console.log(data);
      res.status(201).json({
        message: 'Post added successfully!'
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json();
    });
};

exports.getAll = (req, res, next) => {
  Posts.getAll(dbUtils.getSession(req.body), req.body)
    .then(data => {
      console.log(data);
      // res.status(201).json({
      //   message: 'Post added successfully!',
      //   posts: data
      // });
      writeResponse(res, data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json();
    });
};
