const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const User_Schema = new Schema({
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true, trim: true },
    first_name: { type: String, required: true, trim: true },
    last_name: { type: String, required: true, trim: true },
    gender: { type: String, required: true, trim: true },
    dob: { type: String, required: true, trim: true },
    status: { type: String, required: true, trim: true, default: 'active' },
    access_code: { type: String, required: true, trim: true, unique: true, default: generate_access_code },
    role: { type: String, required: true, trim: true, default: 'member' },
    goal: { type: String, required: false, trim: true, default: null },
    note: { type: String, required: false, trim: true, default: null },
    height: { type: String, required: false, trim: true, default: null },
    weight: { type: String, required: false, trim: true, default: null },
}, { timestamps: true });

function generate_access_code() {
    return Math.floor(100000 + Math.random() * 900000);
}

module.exports = mongoose.model('User', User_Schema);
