const express = require('express');
const router = express.Router();
const { requireAuth, requireGuest, requireAdmin } = require('../middlewares/authMiddleware');
const userController = require('../controllers/userController');

// Authentication routes
router.post('/auth/login', requireGuest, userController.login);
router.post('/auth/register', requireGuest, userController.register);
router.get('/auth/logout', requireAuth, userController.logout);
router.get('/auth/me', requireAuth, userController.getUserData);
router.post('/favorites/:action', requireAuth, userController.toggleFavorites);
router.post('/cart/:action', requireAuth, userController.modifyCart);

// Admin routes
router.post('/admin/promote', requireAdmin, userController.toggleUserRole);
router.get('/admin/users', requireAdmin, userController.getAllUsers);

module.exports = router;