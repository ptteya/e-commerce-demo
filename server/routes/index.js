const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
const furnitureRoutes = require('./furnitureRoutes');

router.use(userRoutes);
router.use(furnitureRoutes);

module.exports = router;

