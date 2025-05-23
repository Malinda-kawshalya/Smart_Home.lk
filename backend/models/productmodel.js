const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    product_name: {
        type: String,
        required: true
    },
    brand_id: {
        type: Number,
        required: true
    },
    category_id: {
        type: Number,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    warranty_period: {
        type: Number,
        required: true
    },
    base_price: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Product', productSchema);