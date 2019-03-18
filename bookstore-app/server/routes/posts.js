const dbUtils = require('../configurators/dbUtils');
const writeResponse = require('../configurators/response').writeResponse;
const router = require('express').Router();
const Posts = require('../models/posts');

let multer = require('multer');
let multerConf = require('../configurators/multer');

// Multer configuration
// multerConf.cleanFolder('uploads/images');
let upload = multer({
  storage: multerConf.imagesUploads
  // fileFilter: multerConf.imageFilter,
  // onFileUploadComplete: (file) => {
  //   console.log('-- File: ' + file.originalname + ' upload was completed. --');
  // }
});

// Create post
router.post("", upload.single("image"), (req, res) => {
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
router.put("", upload.single("image"), (req, res) => {
  console.log(req.body.id + "    " +req.file);
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
  const session = dbUtils.getSession(req.body);
  Posts.findAll(session, req.body)
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

// Delete post
router.delete("/:id", (req, res) => {
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
