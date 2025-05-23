const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    customer_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    location_id: {
        type: Number,
        required: true
    },
    customer_type_id: {
        type: Number,
        required: true
    },
    registration_date: {
        type: Date,
        required: true
    },
    loyalty_points: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Customer', customerSchema);