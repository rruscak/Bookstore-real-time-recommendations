const router = require('express').Router();
const RecController = require('../../controllers/rec');
const authOptional = require('../../middleware/authOptional');

/**
 * url: /api/rec/related
 * */
// Get by id
router.get("/:id", authOptional, RecController.getRelatedBooks);

module.exports = router;
