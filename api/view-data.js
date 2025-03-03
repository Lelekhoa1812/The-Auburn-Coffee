// Basic script to view data saved on MongoDB with NodeJS
// cd coffee-preorder
// node view-data.js
require('dotenv').config();
const mongoose = require('mongoose');

// Connect to DB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        viewData();
    })
    .catch(err => console.error('MongoDB connection error:', err));

// Async fetching orders and items tables from MongoDB
async function viewData() {
    try {
        const orders = await mongoose.connection.db.collection('orders').find().toArray();
        const items = await mongoose.connection.db.collection('items').find().toArray();
        const staffs = await mongoose.connection.db.collection('staffs').find().toArray();
        const users = await mongoose.connection.db.collection('users').find().toArray();
        // Extra log if applied with a basic UI
        console.log('Orders:', orders);
        console.log('Items:', items);
        console.log('Staffs:', staffs);
        console.log('Users:', users);
        // Close connection after fetching the data
        mongoose.connection.close();
    } catch (err) {
        console.error('Error fetching data:', err);
        mongoose.connection.close();
    }
}
