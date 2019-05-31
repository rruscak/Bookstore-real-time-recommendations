const dbUtils = require('../configurators/dbUtils');
const Posts = require('../models/posts');

const Res_ = require('../configurators/response');
const UnauthorizedError = require('../errors/UnauthorizedError');
const ApplicationError = require('../errors/ApplicationError');

// Create post
exports.createPost = (req, res) => {
  const url = req.protocol + '://' + req.get('host') + '/images/';
  const imagePath = url + req.file.filename;
  req.body.imagePath = imagePath;

  const session = dbUtils.getSession(req.body);
  Posts.create(session, req.userData.userId, req.body)
    .then(data => {
      if (!data) {
        throw new UnauthorizedError();
      }
      Res_.writeResponse(res, {
        id: dbUtils.toNumber(data),
        imagePath: imagePath
      });
    })
    .catch((err) => {
      console.log(err);
      Res_.writeError(res, err);
    })
    .then(() => session.close())
};

// Update post
exports.updatePost = (req, res) => {
  // console.log(req.body.id + "    " + req.file);
  let imagePath = req.body.imagePath;
  if (req.file) {
    const url = req.protocol + '://' + req.get('host') + '/images/';
    imagePath = url + req.file.filename;
  }
  req.body.imagePath = imagePath;

  const session = dbUtils.getSession(req.body);
  Posts.update(session, req.body, req.userData.userId)
    .then(data => {
      if (!data) {
        throw new UnauthorizedError();
      }
      Res_.writeResponse(res);
    })
    .catch((err) => {
      console.log(err);
      Res_.writeError(res, err);
    })
    .then(() => session.close())
};

// Get by id
exports.getPost = (req, res) => {
  const session = dbUtils.getSession(req.body);
  Posts.findById(session, req.params.id)
    .then(data => {
      Res_.writeResponse(res, data);
    })
    .catch((err) => {
      console.log(err);
      Res_.writeError(res, err);
    })
    .then(() => session.close())
};

// Get all posts
exports.getAllPosts = (req, res) => {
  const limit = +req.query.limit;
  const page = +req.query.page;
  let skip;
  if (limit && page) {
    skip = limit * (page - 1)
  }

  let posts;
  const session = dbUtils.getSession(req.body);
  Posts.findAll(session, skip, limit)
    .then(data => {
      posts = data;
      return Posts.count(session);
    })
    .then(count => {
      Res_.writeResponse(res, {
        posts: posts,
        count: dbUtils.toNumber(count)
      });
    })
    .catch((err) => {
      console.log(err);
      Res_.writeError(res, err);
    })
    .then(() => session.close())
};

// Delete post
exports.deletePost = (req, res) => {
  const session = dbUtils.getSession(req.body);
  Posts.deleteById(session, req.params.id, req.userData.userId)
    .then(result => {
      if (result == null) {
        throw new ApplicationError();
      }
      if (result === 0) {
        throw new UnauthorizedError();
      }
      Res_.writeResponse(res);
    })
    .catch((err) => {
      console.log(err);
      Res_.writeError(res, err);
    })
    .then(() => session.close())
};

