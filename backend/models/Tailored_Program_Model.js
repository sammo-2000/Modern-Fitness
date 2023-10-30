const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Tailored_Program_Schema = new Schema({
    date: {
        type: Date,
        required: 'Sorry, workout date is required',
        trim: true,
        lowercase: true,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: 'User ID is required',
    },
    workouts: {
        type: Array,
        required: 'Workouts are required',
    }
}, { timestamps: true });

module.exports = mongoose.model('Tailored_Program', Tailored_Program_Schema);