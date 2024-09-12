const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middlewares/authMiddleware');
const userController = require('../controllers/userController');

router.post('/auth/login', userController.login);
router.post('/auth/register', userController.register);
router.get('/auth/logout', requireAuth, userController.logout);
router.get('/auth/me', userController.getUserData);
router.post('/favorites/:action', userController.toggleFavorites);
router.post('/cart/:action', userController.modifyCart);

module.exports = router;