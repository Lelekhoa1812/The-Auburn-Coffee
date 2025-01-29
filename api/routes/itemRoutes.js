const express = require('express');
const Item = require('../models/item');
const router = express.Router();

// Function to generate a 6-character unique Item ID
const generateItemId = async () => {
    // vocab list
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let itemId;
    let exists;
    do {
        // random combination of all vocab
        itemId = Array.from({ length: 6 }, () => characters[Math.floor(Math.random() * characters.length)]).join("");
        exists = await Item.exists({ item_id: itemId });
    } while (exists);
    return itemId;
};

// Add items to an order (this is temporary not-used)
router.post('/add', async (req, res) => {
    try {
        const { order_id, item_name, item_size, item_quantity, item_price } = req.body;
        if (!order_id || !item_name || !item_quantity || item_price === undefined) {
            return res.status(400).json({ message: 'Missing required fields.' });
        }
        const newItem = new Item({
            item_id: await generateItemId(), // Generate unique item_id
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

// Update an item (this is temporary not-used)
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

// Fetch item by order_id
router.get('/by-order/:order_id', async (req, res) => {
    try {
        const items = await Item.find({ order_id: req.params.order_id.toString() });
        if (!items || items.length === 0) {
            return res.status(404).json({ message: "No items found for this order" });
        }
        res.status(200).json(items);
    } catch (error) {
        console.error("Error fetching items:", error);
        res.status(500).json({ message: "Server error while fetching items" });
    }
});


module.exports = router;
