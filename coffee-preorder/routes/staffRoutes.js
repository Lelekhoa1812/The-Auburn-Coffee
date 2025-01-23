const express = require("express");
const router = express.Router();
const Staff = require("../models/staff");

let currentStaffId = 1; // Simulate auto-increment (better to use a database sequence)

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
        const newStaff = new Staff({ staff_id: currentStaffId++, staff_name, staff_pin });
        await newStaff.save();
        res.status(201).json(newStaff);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

module.exports = router;
