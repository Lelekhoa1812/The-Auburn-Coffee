const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    order_id: { type: String, required: true, unique: true },
    customer_name: { type: String, required: true },
    order_eta: { type: String, default: null },
    order_time: { type: String, required: true },
    order_status: { type: String, enum: ['Pending', 'Editing', 'Received', 'Completed', 'Awaiting'], default: 'Awaiting' },
    total_price: { type: Number, required: true },
    order_notice: { type: String, default: null },
    registered_staff: { type: Number, required: true, default: 0 }
});

module.exports = mongoose.model('Order', orderSchema);
