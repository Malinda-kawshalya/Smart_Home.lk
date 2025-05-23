const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customercontroller');

// Create a new customer
router.post('/', customerController.createCustomer);

// Create multiple customers
router.post('/bulk', customerController.createManyCustomers);

// Get all customers
router.get('/', customerController.getAllCustomers);

// Get customer by ID
router.get('/:id', customerController.getCustomerById);

// Update customer
router.put('/:id', customerController.updateCustomer);

// Delete customer
router.delete('/:id', customerController.deleteCustomer);

module.exports = router;