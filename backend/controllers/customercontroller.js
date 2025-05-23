const Customer = require('../models/customermodel');

// Create new customer
exports.createCustomer = async (req, res) => {
    try {
        // Convert registration_date string to Date object
        const customerData = {
            ...req.body,
            registration_date: new Date(req.body.registration_date)
        };
        
        const customer = new Customer(customerData);
        const savedCustomer = await customer.save();
        res.status(201).json(savedCustomer);
    } catch (error) {
        res.status(400).json({ 
            message: error.message,
            details: error.errors 
        });
    }
};

// Create many customers
exports.createManyCustomers = async (req, res) => {
    try {
        const customers = req.body.map(customer => ({
            ...customer,
            registration_date: new Date(customer.registration_date)
        }));
        
        const savedCustomers = await Customer.insertMany(customers);
        res.status(201).json(savedCustomers);
    } catch (error) {
        res.status(400).json({ 
            message: error.message,
            details: error.errors 
        });
    }
};

// Get all customers
exports.getAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.find();
        res.json(customers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get customer by ID
exports.getCustomerById = async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer) return res.status(404).json({ message: 'Customer not found' });
        res.json(customer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update customer
exports.updateCustomer = async (req, res) => {
    try {
        const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!customer) return res.status(404).json({ message: 'Customer not found' });
        res.json(customer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete customer
exports.deleteCustomer = async (req, res) => {
    try {
        const customer = await Customer.findByIdAndDelete(req.params.id);
        if (!customer) return res.status(404).json({ message: 'Customer not found' });
        res.json({ message: 'Customer deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};