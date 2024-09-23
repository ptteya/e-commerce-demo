const express = require('express');
const router = express.Router();
const { requireAuth, requireGuest, requireAdmin } = require('../middlewares/authMiddleware');
const userController = require('../controllers/userController');

// Authentication routes
router.post('/users/login', requireGuest, userController.login);
router.post('/users/register', requireGuest, userController.register);
router.get('/users/logout', requireAuth, userController.logout);
router.get('/users/me', requireAuth, userController.getUserData);
router.post('/users/favorites/:action', requireAuth, userController.toggleFavorites);
router.post('/users/cart/:action', requireAuth, userController.modifyCart);
router.delete('/users/:collectionName', requireAuth, userController.emptyCollection);

// Admin routes
router.post('/admin/promote', requireAdmin, userController.toggleUserRole);
router.get('/admin/users', requireAdmin, userController.getAllUsers);

module.exports = router;