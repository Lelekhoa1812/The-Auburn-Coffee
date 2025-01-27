const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    item_id: { type: Number, required: true },
    order_id: { type: Number, required: true },
    item_name: { type: String, required: true },
    item_size: { type: String, default: null },
    item_quantity: { type: Number, required: true },
    item_price: { type: Number, required: true }
});

module.exports = mongoose.model('Item', itemSchema);
