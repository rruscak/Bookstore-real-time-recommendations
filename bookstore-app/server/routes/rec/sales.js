const router = require('express').Router();
const RecController = require('../../controllers/rec');

/**
 * url: /api/rec/sales
 * */
// Get by id
router.get("", RecController.getBestSellingBooks);

module.exports = router;
