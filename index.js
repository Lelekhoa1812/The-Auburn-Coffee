require('dotenv').config();

// Constants of required modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require("path");

// Robust and fast connection with express
const app = express();

// Using to deny origin error
const cors = require('cors');
const corsOptions = {
    // origin: 'http://localhost:8000', // Allow requests from this origin 
    origin: 'https://the-auburn-coffee.vercel.app', // Allow requests from this origin 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
};
app.use(cors(corsOptions));

// All routers here
const orderRoutes = require('./routes/orderRoutes');
const itemRoutes = require('./routes/itemRoutes');
const staffRoutes = require('./routes/staffRoutes');

// Prepare json body to be saved on MongoDB
app.use(bodyParser.json());
// Connect to DB on .env configs
// mongoose
//     .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => console.error('MongoDB connection error:', err));
let isConnected;
async function connectDB() {
    if (isConnected) return;
    try {
        const db = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        isConnected = db.connections[0].readyState;
        console.log("Connected to MongoDB:", process.env.MONGO_URI);
    } catch (err) {
        console.error("Failed to connect to MongoDB:", err);
        throw err;
    }
}
app.use(async (req, res, next) => {
    try {
        // console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`); // Debug all request method + url + content
        await connectDB();
        next();
    } catch (err) {
        console.error('Database connection error:', err);
        res.status(500).json({ error: 'Database connection failed' });
    }
});
// Routing to order, item endpoints
app.use('/api/orders', orderRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/staff', staffRoutes);

// Port on execution (for local deployment)
// app.listen(process.env.PORT || 5002, () => console.log('Server running'));

// Catch-all for unknown API routes
app.use('/api', (req, res) => {
    res.status(404).json({ error: 'API route not found' });
});

// Serve static files for the Frontend
app.use(express.static(path.join(__dirname)));

// Debug endpoint to make sure everything works, future development could expand the utilities on this endpoint beyond
app.get('/debug', (req, res) => {
    res.json({ message: 'Debug endpoint works' });
});

// Export for Vercel
module.exports = app;