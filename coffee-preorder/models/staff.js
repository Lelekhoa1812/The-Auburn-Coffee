const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
    staff_id: { type: Number, required: true, unique: true },
    staff_name: { type: String, required: true }
});

module.exports = mongoose.model('Staff', staffSchema);
