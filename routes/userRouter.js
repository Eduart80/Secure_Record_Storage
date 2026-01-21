const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../utils/auth')

router.post('/api/users/login', userController.fetchUser);
router.post('/api/users/register', userController.registerUser);

module.exports = router;