const express = require('express');
const router = express.Router();
const vendorController = require('../controllers/vendor'); // Adjust the path as needed

// Route to create a new product
router.post('/products', vendorController.createProduct);

// Route to get all products
router.get('/products', vendorController.getAllProducts);

// Route to get a single product by ID
router.get('/products/:id', vendorController.getProductById);

// Route to update a product by ID
router.put('/products/:id', vendorController.updateProduct);

// Route to delete a product by ID
router.delete('/products/:id', vendorController.deleteProduct);

module.exports = router;