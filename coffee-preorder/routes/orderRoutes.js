const express = require('express');
const router = express.Router();
const Order = require('../models/order'); // Import Order model

let currentOrderId = 1; // Simulate auto-increment (better to use a database sequence)

router.post('/add', async (req, res) => {
    try {
        const { customer_name, order_eta, order_time, total_price, order_notice, registered_staff } = req.body;

        // Validate required fields
        if (!customer_name || !order_time || total_price === undefined) {
            return res.status(400).json({ message: 'Missing required fields.' });
        }

        // Auto-increment `order_id`
        const newOrder = new Order({
            order_id: currentOrderId++,
            customer_name,
            order_eta,
            order_time,
            order_status: 'Pending',
            total_price,
            order_notice,
            registered_staff: registered_staff || 0,
        });

        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder); // Return saved order
    } catch (error) {
        console.error('Error adding order:', error);
        res.status(500).json({ message: 'Server error while adding order.' });
    }
});

// Fetch all orders
router.get("/", async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ message: "Server error while fetching orders." });
    }
});

module.exports = router;
