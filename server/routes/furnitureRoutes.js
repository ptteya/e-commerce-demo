const express = require('express');
const router = express.Router();
const furnitureController = require('../controllers/furnitureController');

router.get('/furniture/catalog', furnitureController.getFurniture);
router.post('/furniture/catalog', furnitureController.create);
router.get('/furniture/:furnitureId', furnitureController.getDetails);
router.put('/furniture/:furnitureId', furnitureController.edit);
router.delete('/furniture/:furnitureId', furnitureController.deleteFurniture);

module.exports = router;