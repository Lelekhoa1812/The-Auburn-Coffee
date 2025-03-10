const express = require("express");
const router = express.Router();
const User = require("../models/user");

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

// Function to generate a unique 4-number user id
async function generateUniqueUserID() {
    const characters = "0123456789";
    let userID
    let isUnique = false;
    while (!isUnique) {
        userID = Array.from({ length: 4 }, () => characters[Math.floor(Math.random() * characters.length)]).join("");
        const existingUser = await User.findOne({ user_id: userID });
        if (!existingUser) isUnique = true; // Ensure uniqueness
    }
    return userID;
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
        const user_id = await generateUniqueUserID();
        const newUser = new User({
            user_id,
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

// Edit User Info
router.put("/edit", async (req, res) => {
    try {
        const { id, user_name, user_pin } = req.body;
        // Validate required fields
        if (!id || !user_name || !user_pin) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        // Check if the name already exists for a different user
        const existingUser = await User.findOne({ user_name, user_id: { $ne: id } });
        if (existingUser) {
            return res.status(400).send("User name already exists for another user.");
        }
        // Find and update the user
        const updatedUser = await User.findOneAndUpdate(
            { user_id: id }, // Use `user_id` for filtration
            { user_name, user_pin }, // Update name & PIN
            { new: true } // Return the updated user
        );
        // Broken request
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        // Successful
        res.status(200).json({ message: "User updated successfully", updatedUser });
    } catch (err) {
        console.error("Error updating user:", err);
        res.status(500).json({ message: "Server error while updating user account" });
    }
});

// Increment user_streak when scanning QR Code or entering manually
router.post("/increment", async (req, res) => {
    const { user_code } = req.body;
    try {
        const user = await User.findOne({ user_code });
        // User data not obtained
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // Increment streak by 1
        user.user_streak += 1;
        await user.save();
        res.status(200).json({ 
            user_name: user.user_name, 
            user_streak: user.user_streak 
        });
    // Broken request
    } catch (error) {
        console.error("Error updating user streak:", error);
        res.status(500).json({ message: "Server error while updating streak." });
    }
});

// Decrease user_streak by 10 when redeeming gift/freebie
router.post("/decrement", async (req, res) => {
    const { user_code } = req.body;
    try {
        const user = await User.findOne({ user_code });
        if (!user) return res.status(404).json({ message: "User not found" });

        if (user.user_streak < 10) {
            return res.status(400).json({ message: "Not enough streak points to redeem." });
        }

        user.user_streak -= 10; // Deduct 10 points
        await user.save();
        
        res.status(200).json(user); // Return updated user data
    } catch (error) {
        console.error("Error redeeming streak:", error);
        res.status(500).json({ message: "Server error while redeeming streak." });
    }
});

module.exports = router;
