const express = require('express');
const router = express.Router();
const Order = require('../models/order'); // Import Order model
const Item = require('../models/item');   // Import Item model to list all item by order_id

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

// Fetch all orders with their associated items
router.get('/with-items', async (req, res) => {
    try {
        const ordersWithItems = await Order.aggregate([
            {
                $lookup: {
                    from: 'items', // MongoDB collection name for the Item model
                    localField: 'order_id',
                    foreignField: 'order_id',
                    as: 'items', // Name of the field where items will be embedded
                },
            },
        ]);
        // Status 200 returns item matching order_id
        console.log('Orders with Items:', ordersWithItems); // Debug item JSON that is obtained
        res.status(200).json(ordersWithItems);
    } catch (error) {
        console.error('Error fetching orders with items:', error);
        res.status(500).json({ message: 'Server error while fetching orders with items.' });
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
