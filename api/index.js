require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// CORS Configuration
const cors = require('cors');
const corsOptions = {
    // origin: 'http://localhost:3001', // Allow requests from local server on port 3001 (Vercel local alternative)
    origin: 'https://the-auburn-coffee.vercel.app', // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],       // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
};
app.use(cors(corsOptions));

// Parse JSON
app.use(bodyParser.json());

// MongoDB Connection
let isConnected = false;
async function connectDB() {
    if (isConnected) return;
    try {
        const db = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        isConnected = db.connections[0].readyState;
        console.log('Connected to MongoDB:', process.env.MONGO_URI);
    } catch (err) {
        console.error('Failed to connect to MongoDB:', err);
        throw err;
    }
}
// Attempt async connecting MongoDB
app.use(async (req, res, next) => {
    try {
        console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`); // Debug all request method + url + content
        await connectDB();
        next();
    } catch (err) {
        console.error('Database connection error:', err);
        res.status(500).json({ error: 'Database connection failed' });
    }
});

// API Routes
const orderRoutes = require('./routes/orderRoutes');
const itemRoutes = require('./routes/itemRoutes');
const staffRoutes = require('./routes/staffRoutes');
const userRoutes = require('./routes/userRoutes');
// API endpoints
app.use('/api/orders', orderRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/user', userRoutes);
// Catch-all for Unknown API Routes
app.use('/api', (req, res) => {
    res.status(404).json({ error: 'API route not found' });
});

// Debug Endpoint
app.get('/debug', (req, res) => {
    res.json({ message: 'Debug endpoint works' });
});

// Port on execution (for local deployment)
// app.listen(process.env.PORT || 5002, () => console.log('Server running'));

// Export for Vercel
module.exports = app;
