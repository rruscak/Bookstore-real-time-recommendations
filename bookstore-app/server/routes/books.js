const router = require('express').Router();
const BooksController = require('../controllers/books');

/**
 * url: /api/books
 * */
// Get by id
router.get("/:id", BooksController.getBook);
// Get filtered
router.get("", BooksController.getAllBooks);

module.exports = router;
