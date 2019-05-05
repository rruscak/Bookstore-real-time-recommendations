const router = require('express').Router();
const FiltersController = require('../controllers/filters');

/**
 * url: /api/filters
 * */
// Get book filters
router.get("", FiltersController.getBookFilters);

module.exports = router;
