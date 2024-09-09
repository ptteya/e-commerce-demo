const express = require('express');
const router = express.Router();

const furnitureController = require('../controllers/furnitureController');

router.get('/furniture/catalog', furnitureController.getAllItems);
router.get('/furniture/catalog/:category', furnitureController.getCatalogItems);
router.get('/furniture/:furnitureId', furnitureController.getDetails);

module.exports = router;