const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.put('/profile', require('../middleware/auth'), authController.updateProfile);
router.get('/profile', require('../middleware/auth'), authController.getProfile);

module.exports = router; 