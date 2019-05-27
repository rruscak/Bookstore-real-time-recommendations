const router = require('express').Router();
const OrdersController = require('../controllers/orders');
const auth = require('../middleware/auth');

/**
 * url: /api/orders
 * */
// Add Book to Cart
router.post("", auth, OrdersController.createOrder);

module.exports = router;
