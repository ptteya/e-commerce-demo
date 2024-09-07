const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middlewares/authMiddleware');

const userController = require('../controllers/userController');

router.post('/auth/login', userController.login);
router.post('/auth/register', userController.register);
router.get('/auth/logout', requireAuth, userController.logout);

module.exports = router;