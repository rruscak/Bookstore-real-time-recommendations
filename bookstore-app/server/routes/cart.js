const router = require('express').Router();
const CartController = require('../controllers/cart');
const auth = require('../middleware/auth');

// extractFile.cleanFolder('uploads/images');

/**
 * url: /api/cart
 * */
// Add Book to Cart
router.put("", auth, CartController.addToCart);
// Remove from Cart
router.delete("/:id", auth, CartController.RemoveFromCart);

module.exports = router;
