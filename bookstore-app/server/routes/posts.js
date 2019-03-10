const dbUtils = require('../configurators/dbUtils');
const writeResponse = require('../configurators/response').writeResponse;
const router = require('express').Router();
const Posts = require('../models/posts');

router.post("", (req, res) => {
  const session = dbUtils.getSession(req.body);
  Posts.create(session, req.body)
    .then(data => {
      writeResponse(res, {
        id: dbUtils.toNumber(data)
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json();
    })
    .then(() => session.close())
});

router.put("", (req, res) => {
  const session = dbUtils.getSession(req.body);
  Posts.update(session, req.body)
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
