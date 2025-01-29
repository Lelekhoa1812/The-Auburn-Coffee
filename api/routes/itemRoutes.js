const express = require('express');
const Item = require('../models/item');
const router = express.Router();

let currentItemId = 1; // Simulate auto-increment (better to use a database sequence)

// Add items to an order
router.post('/add', async (req, res) => {
    try {
        const { order_id, item_name, item_size, item_quantity, item_price } = req.body;
        if (!order_id || !item_name || !item_quantity || item_price === undefined) {
            return res.status(400).json({ message: 'Missing required fields.' });
        }
        const newItem = new Item({
            item_id: Math.floor(Math.random() * 100000), // Generate random unique ID for item
            order_id,
            item_name,
            item_size: item_size || null,
            item_quantity,
            item_price,
        });
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (error) {
        console.error('Error adding item:', error);
        res.status(500).json({ message: 'Server error while adding item.' });
    }
});
router.put('/update/:item_id', async (req, res) => {
    const { item_id } = req.params;
    if (!item_id || item_id === 'undefined') {
        return res.status(400).json({ message: "Invalid or missing item_id" });
    }
    try {
        const updatedItem = await Item.findOneAndUpdate(
            { item_id: item_id },
            req.body,
            { new: true }
        );
        if (!updatedItem) {
            return res.status(404).json({ message: "Item not found" });
        }
        res.status(200).json(updatedItem);
    } catch (error) {
        console.error("Error updating item:", error);
        res.status(500).json({ message: "Server error while updating item." });
    }
});


module.exports = router;
