require('dotenv').config();

// Constants of required modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Robust and fast connection with express
const app = express();

// Using to deny origin error
const cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:8000', // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
};
app.use(cors(corsOptions));

// All routers here
const orderRoutes = require('./routes/orderRoutes');
const itemRoutes = require('./routes/itemRoutes');

// Prepare json body to be saved on MongoDB
app.use(bodyParser.json());
// Connect to DB on .env configs
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routing to order, item endpoints
app.use('/api/orders', orderRoutes);
app.use('/api/items', itemRoutes);

// Port on execution
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
