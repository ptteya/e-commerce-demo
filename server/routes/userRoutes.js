const express = require('express');
const router = express.Router();
const { requireAuth, requireGuest, requireAdmin } = require('../middlewares/authMiddleware');
const userController = require('../controllers/userController');

// Authentication routes
router.post('/users/login', requireGuest, userController.login);
router.post('/users/register', requireGuest, userController.register);
router.get('/users/logout', requireAuth, userController.logout);
router.get('/users/me', requireAuth, userController.getUserData);

// User Collection Routes
router.post('/users/:collection', requireAuth, userController.addToCollection)
router.delete('/users/:collection', requireAuth, userController.emptyCollection);
router.put('/users/:collection/:furnitureId', requireAuth, userController.updateCollectionItem);
router.delete('/users/:collection/:furnitureId', requireAuth, userController.removeCollectionItem);

// Admin routes
router.post('/admin/promote', requireAdmin, userController.toggleUserRole);
router.get('/admin/users', requireAdmin, userController.getAllUsers);

module.exports = router;