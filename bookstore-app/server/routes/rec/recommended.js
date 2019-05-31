const router = require('express').Router();
const RecController = require('../../controllers/rec');
const auth = require('../../middleware/auth');

/**
 * url: /api/rec/recommended
 * */
// Get by id
router.get("", auth, RecController.getRecommendedBooks);

module.exports = router;
