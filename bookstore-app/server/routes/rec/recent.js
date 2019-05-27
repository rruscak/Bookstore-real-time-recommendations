const router = require('express').Router();
const RecController = require('../../controllers/rec');
const auth = require('../../middleware/auth');

/**
 * url: /api/rec/recent
 * */
// Get by id
router.get("", auth, RecController.getRecentlyViewedBooks);

module.exports = router;
