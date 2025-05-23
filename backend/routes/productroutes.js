// filepath: d:\MY PROJECTS\Smart_Home.lk\backend\routes\productroutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productcontroller');

// Create a new product
router.post('/', productController.createProduct);

// Create multiple products
router.post('/bulk', productController.createManyProducts);

// Get all products
router.get('/', productController.getAllProducts);

// Get product by ID
router.get('/:id', productController.getProductById);

// Update product
router.put('/:id', productController.updateProduct);

// Delete product
router.delete('/:id', productController.deleteProduct);

module.exports = router;