const router = require('express').Router();
const BookController = require('../controllers/books');
const auth = require('../middleware/auth');

/**
 * url: /api/rate
 * */
// Rate Book
router.put("/", auth, BookController.rateBook);

module.exports = router;
