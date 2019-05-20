const router = require('express').Router();
const BookController = require('../controllers/books');
const auth = require('../middleware/auth');

/**
 * url: /api/rate
 * */
// Add Book to Cart
router.put("/", auth, BookController.rateBook);

module.exports = router;
