const express = require("express");
const router = express.Router();
const Staff = require("../models/staff");


// Function to generate a unique 4-number staff id
async function generateUniqueStaffID() {
    const characters = "0123456789";
    let staffID
    let isUnique = false;
    while (!isUnique) {
        staffID = Array.from({ length: 4 }, () => characters[Math.floor(Math.random() * characters.length)]).join("");
        const existingStaff = await Staff.findOne({ staff_id: staffID });
        if (!existingStaff) isUnique = true; // Ensure uniqueness
    }
    return staffID;
}

// Staff Login
router.post("/login", async (req, res) => {
    const { staff_name, staff_pin } = req.body;
    try {
        const staff = await Staff.findOne({ staff_name, staff_pin });
        if (!staff) return res.status(401).send("Invalid credentials");
        res.status(200).json(staff);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

// Staff Register
router.post("/register", async (req, res) => {
    const { staff_name, staff_pin } = req.body;
    try {
        if (await Staff.findOne({ staff_name })) {
            return res.status(400).send("Staff name already exists");
        }
        const staff_id = await generateUniqueStaffID();
        const newStaff = new Staff({ staff_id, staff_name, staff_pin });
        await newStaff.save();
        res.status(201).json(newStaff);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

// Edit Staff Info
router.put("/edit", async (req, res) => {
    try {
        const { id, staff_name, staff_pin } = req.body;

        // Validate required fields
        if (!id || !staff_name || !staff_pin) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        // Check if the name already exists for a different staff
        const existingStaff = await Staff.findOne({ staff_name, staff_id: { $ne: id } });
        if (existingStaff) {
            return res.status(400).send("Staff name already exists for another staff.");
        }
        // Find and update the staff
        const updatedStaff = await Staff.findOneAndUpdate(
            { staff_id: id }, // Use `staff_id` for filtration
            { staff_name, staff_pin }, // Update name & PIN
            { new: true } // Return the updated staff
        );
        // Broken request
        if (!updatedStaff) {
            return res.status(404).json({ message: "Staff not found" });
        }
        // Successful
        res.status(200).json({ message: "Staff updated successfully", updatedStaff });
    } catch (err) {
        console.error("Error updating staff:", err);
        res.status(500).json({ message: "Server error while updating staff account" });
    }
});


module.exports = router;
