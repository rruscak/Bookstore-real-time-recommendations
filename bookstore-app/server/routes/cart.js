const router = require('express').Router();
const CartController = require('../controllers/cart');
const auth = require('../middleware/auth');

/**
 * url: /api/cart
 * */
// Add Book to Cart
router.put("/:id", auth, CartController.addToCart);
// Set Book Quantity in Cart
router.put("", auth, CartController.setQuantity);
// Remove from Cart
router.delete("/:id", auth, CartController.removeFromCart);
// Get Cart
router.get("", auth, CartController.listCart);

module.exports = router;
