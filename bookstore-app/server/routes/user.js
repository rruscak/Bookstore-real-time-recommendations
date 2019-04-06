const router = require('express').Router();
const UserController = require('../controllers/user');

// Sing Up
router.post("/signup", UserController.createUser);
// Log In
router.post("/login", UserController.logIn);

module.exports = router;
