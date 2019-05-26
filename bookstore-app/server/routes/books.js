const router = require('express').Router();
const BooksController = require('../controllers/books');
const authOptional = require('../middleware/authOptional');

/**
 * url: /api/books
 * */
// Get by id
router.get("/:id", authOptional, BooksController.getBook);
// Get filtered
router.get("", BooksController.getAllBooks);

module.exports = router;
