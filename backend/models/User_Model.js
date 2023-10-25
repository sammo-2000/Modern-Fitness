const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User_Schema = new Schema({
    email: {
        type: String,
        required: 'Email address is required',
        trim: true,
        lowercase: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: 'Password is required',
        trim: true,
        lowercase: true,
    },
    first_name: {
        type: String,
        required: 'First name is required',
        trim: true,
        lowercase: true,
    },
    last_name: {
        type: String,
        required: 'Last name is required',
        trim: true,
        lowercase: true,
    },
    status: {
        type: String,
        required: true,
        default: 'active'
    },
    access_code: {
        type: Number,
        required: true,
        unique: true,
        default: generate_access_code
    },
    role: {
        type: String,
        required: true,
        default: 'member'
    },
}, { timestamps: true });

function generate_access_code() {
    return Math.floor(100000 + Math.random() * 900000);
}

module.exports = mongoose.model('User', User_Schema);
