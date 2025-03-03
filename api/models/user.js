const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user_id: { type: Number, required: true, unique: true },
    user_name: { type: String, required: true, unique: true },
    user_pin: { type: Number, required: true },
    user_code: { type: String, required: true, unique: true },
    user_streak: { type: Number, required: true }
});

module.exports = mongoose.model('User', userSchema);
