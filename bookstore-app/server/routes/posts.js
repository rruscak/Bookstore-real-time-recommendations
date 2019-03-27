const dbUtils = require('../configurators/dbUtils');
const writeResponse = require('../configurators/response').writeResponse;
const router = require('express').Router();
const Posts = require('../models/posts');
const auth = require('../middleware/auth');
let multer = require('multer');
let multerConf = require('../configurators/multer');

// multerConf.cleanFolder('uploads/images');
// Multer configuration
let upload = multer({
  storage: multerConf.imagesUploads
});

// Create post
router.post("", auth, upload.single("image"), (req, res) => {
  const url = req.protocol + '://' + req.get('host') + '/images/';
  const imagePath = url + req.file.filename;
  req.body.imagePath = imagePath;

  const session = dbUtils.getSession(req.body);
  Posts.create(session, req.body)
    .then(data => {
      writeResponse(res, {
        id: dbUtils.toNumber(data),
        imagePath: imagePath
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json();
    })
    .then(() => session.close())
});

// Update post
router.put("", auth, upload.single("image"), (req, res) => {
  console.log(req.body.id + "    " + req.file);
  let imagePath = req.body.imagePath;
  if (req.file) {
    const url = req.protocol + '://' + req.get('host') + '/images/';
    imagePath = url + req.file.filename;
  }
  req.body.imagePath = imagePath;

  const session = dbUtils.getSession(req.body);
  Posts.update(session, req.body)
    .then(data => {
      console.log(data);
      writeResponse(res, {
        imagePath: imagePath
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json();
    })
    .then(() => session.close())
});

// Get by id
router.get("/:id", (req, res) => {
  const session = dbUtils.getSession(req.body);
  Posts.findById(session, req.params.id)
    .then(data => {
      console.log(data);
      writeResponse(res, data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json();
    })
    .then(() => session.close())
});

// Get all posts
router.get("", (req, res, next) => {
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
      console.log(posts);
      return Posts.count(session);
    })
    .then(count => {
      writeResponse(res, {
        posts: posts,
        count: dbUtils.toNumber(count)
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json();
    })
    .then(() => session.close())
});

// Delete post
router.delete("/:id", auth, (req, res) => {
  const session = dbUtils.getSession(req.body);
  Posts.deleteById(session, req.params.id)
    .then(data => {
      console.log(data);
      writeResponse(res);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json();
    })
    .then(() => session.close())
});

module.exports = router;
