const express = require('express');
const router = express.Router();
const furnitureController = require('../controllers/furnitureController');

router.get('/furniture/catalog', furnitureController.getFurniture);
router.get('/furniture/:furnitureId', furnitureController.getDetails);
router.put('/furniture/:furnitureId', furnitureController.edit);

module.exports = router;