const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
const furnitureRoutes = require('./furnitureRoutes');

router.use(userRoutes);
router.use(furnitureRoutes);
router.use((req, res) => {
    res.status(404).json({ error: 'Not Found' })
});

module.exports = router;

