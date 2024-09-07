const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.post('/auth/login', userController.login);
router.post('/auth/register', userController.register);

module.exports = router;