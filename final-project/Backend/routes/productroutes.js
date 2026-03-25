const express = require('express');
const router = express.Router();
const pctrl = require('../controller/productController');
const protect = require('../middleware/authMiddleware');

router.post('/add', protect, pctrl.createProduct);
router.get('/', protect, pctrl.allProduct);
router.get('/:id', protect, pctrl.oneProduct);
router.put('/:id', protect, pctrl.updateProduct);
router.delete('/:id', protect, pctrl.deleteProduct);

module.exports = router;
