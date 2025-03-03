const express = require("express");
const router = express.Router();
const User = require("../models/user");

let currentUserId = 1; // Simulate auto-increment (better to use a database sequence)

// Function to generate a unique 4-character user code
async function generateUniqueUserCode() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let userCode;
    let isUnique = false;

    while (!isUnique) {
        userCode = Array.from({ length: 4 }, () => characters[Math.floor(Math.random() * characters.length)]).join("");
        const existingUser = await User.findOne({ user_code: userCode });
        if (!existingUser) isUnique = true; // Ensure uniqueness
    }

    return userCode;
}

// User Login
router.post("/login", async (req, res) => {
    const { user_name, user_pin } = req.body;
    try {
        const user = await User.findOne({ user_name, user_pin });
        if (!user) return res.status(401).send("Invalid credentials");
        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

// User Register
router.post("/register", async (req, res) => {
    const { user_name, user_pin } = req.body;
    try {
        if (await User.findOne({ user_name })) {
            return res.status(400).send("User name already exists");
        }
        // Generate a unique user code
        const user_code = await generateUniqueUserCode();
        const newUser = new User({
            user_id: currentUserId++, 
            user_name,
            user_pin,
            user_code, // Assign generated unique user code
            user_streak: 0
        });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

module.exports = router;
