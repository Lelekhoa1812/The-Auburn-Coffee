require('dotenv').config();
const mongoose = require('mongoose');

// Usages:
// node clear-table.js orders
// node clear-table.js items
// node clear-table.js staffs
// node clear-table.js users

// MongoDB connection string from .env
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error('Error: MONGO_URI not defined in .env');
    process.exit(1);
}

// Connect to MongoDB
async function connectDB() {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
}

// Clear the specified collection
async function clearTable(collectionName) {
    try {
        if (!collectionName) {
            console.error('Error: No table name provided');
            process.exit(1);
        }

        // Ensure the collection exists before proceeding
        const collections = await mongoose.connection.db.listCollections().toArray();
        const collectionNames = collections.map((col) => col.name);

        if (!collectionNames.includes(collectionName)) {
            console.error(`Error: Collection "${collectionName}" does not exist`);
            process.exit(1);
        }

        await mongoose.connection.db.collection(collectionName).deleteMany({});
        console.log(`Successfully cleared all data from "${collectionName}" collection.`);
    } catch (error) {
        console.error('Error clearing table:', error.message);
    } finally {
        mongoose.connection.close();
    }
}

// Main execution
(async () => {
    const collectionName = process.argv[2]; // Get the table name from command line arguments
    await connectDB();
    await clearTable(collectionName);
})();
