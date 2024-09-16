const express = require('express');
const router = express.Router();
const furnitureController = require('../controllers/furnitureController');
const { requireAdmin } = require('../middlewares/authMiddleware');

router.get('/furniture/catalog', furnitureController.getFurniture);
router.post('/furniture/catalog', requireAdmin, furnitureController.create);
router.get('/furniture/:furnitureId', furnitureController.getDetails);
router.put('/furniture/:furnitureId', requireAdmin, furnitureController.edit);
router.delete('/furniture/:furnitureId', requireAdmin, furnitureController.deleteFurniture);

module.exports = router;