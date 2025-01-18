const express = require('express');
const Order = require('../models/order');
const router = express.Router();

router.post('/add', async (req, res) => {
    try {
        const newOrder = new Order(req.body);
        await newOrder.save();
        res.status(201).json({ message: 'Order added successfully', order: newOrder });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add order', error });
    }
});

router.get('/all', async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve orders', error });
    }
});

module.exports = router;
