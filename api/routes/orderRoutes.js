const express = require('express');
const router = express.Router();
const Order = require('../models/order'); // Import Order model
const Item = require('../models/item');   // Import Item model to list all item by order_id

// Function to generate a 6-character unique Order ID
const generateOrderId = async () => {
    // vocab list
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let orderId;
    let exists;
    do {
        // random combination of all vocab
        orderId = Array.from({ length: 6 }, () => characters[Math.floor(Math.random() * characters.length)]).join("");
        exists = await Order.exists({ order_id: orderId });
    } while (exists);
    return orderId;
};
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

// Add new order
router.post('/add', async (req, res) => {
    try {
        const { customer_name, order_eta, order_time, total_price, order_notice, registered_staff, items } = req.body;
        // Validate required fields
        if (!customer_name || !order_time || total_price === undefined) {
            return res.status(400).json({ message: 'Missing required fields.' });
        }
        const orderId = await generateOrderId(); // Generate unique order_id
        // Create new order object with these fields
        const newOrder = new Order({
            order_id: orderId,
            customer_name,
            order_eta,
            order_time,
            order_status: 'Pending',
            total_price,
            order_notice,
            registered_staff: registered_staff || 0,
        });
        const savedOrder = await newOrder.save();
        // Add items associated with this order (item_id generated with similar method to order_id)
        if (items && items.length > 0) {
            for (const item of items) {
                const newItem = new Item({
                    item_id: await generateItemId(), // Generate unique item_id
                    order_id: orderId,
                    item_name: item.item_name,
                    item_size: item.item_size || null,
                    item_quantity: item.item_quantity,
                    item_price: item.item_price,
                });
                await newItem.save();
            }
        }
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

// Update an existing order and merge items (instead of replacing all), this route could also add new item
router.put('/update/:order_id', async (req, res) => {
    try {
        const orderId = req.params.order_id.toString();
        const { customer_name, order_eta, order_time, total_price, order_notice, order_status, registered_staff, items } = req.body;
        // Update the order details
        const updatedOrder = await Order.findOneAndUpdate(
            { order_id: orderId },
            { customer_name, order_eta, order_time, total_price, order_notice, order_status, registered_staff },
            { new: true }
        );
        if (!updatedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }
        // Handle item updates and new item additions
        for (const item of items) {
            if (item.item_id) {
                // Update existing item
                await Item.findOneAndUpdate(
                    { item_id: item.item_id },
                    { 
                        item_name: item.item_name,
                        item_size: item.item_size,
                        item_quantity: item.item_quantity,
                        item_price: item.item_price
                    },
                    { new: true }
                );
            } else {
                // Add new item if it doesn't have an `item_id`
                const newItem = new Item({
                    item_id: await generateItemId(), // Generate unique item_id
                    order_id: orderId,
                    item_name: item.item_name,
                    item_size: item.item_size || null,
                    item_quantity: item.item_quantity,
                    item_price: item.item_price,
                });
                await newItem.save();
            }
        }
        res.status(200).json({ message: "Order and items updated successfully", updatedOrder });
    } catch (error) {
        console.error("Error updating order and items:", error);
        res.status(500).json({ message: "Server error while updating order and items." });
    }
});

// Edit Order: Change status to "Editing"
router.put('/:order_id/edit', async (req, res) => {
    try {
        const updatedOrder = await Order.findOneAndUpdate(
            { order_id: req.params.order_id },
            { order_status: "Editing" },
            { new: true }
        );
        if (!updatedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json(updatedOrder);
    } catch (error) {
        console.error("Error setting order to editing:", error);
        res.status(500).json({ message: "Server error while editing order." });
    }
});

// Confirm Order (Set to "Pending")
router.put('/:order_id/confirm', async (req, res) => {
    try {
        const updatedOrder = await Order.findOneAndUpdate(
            { order_id: req.params.order_id },
            { order_status: "Pending" },
            { new: true }
        );
        if (!updatedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json(updatedOrder);
    } catch (error) {
        console.error("Error confirming order:", error);
        res.status(500).json({ message: "Server error while confirming order." });
    }
});

// Delete an order and associated items
router.delete('/delete/:order_id', async (req, res) => {
    try {
        const orderId = req.params.order_id.toString();
        const deletedOrder = await Order.findOneAndDelete({ order_id: orderId });
        if (!deletedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }
        // Delete all items associated with this order
        await Item.deleteMany({ order_id: orderId }); 
        res.status(200).json({ message: "Order and related items deleted successfully" });
    } catch (error) {
        console.error("Error deleting order:", error);
        res.status(500).json({ message: "Server error while deleting order." });
    }
});

module.exports = router;
