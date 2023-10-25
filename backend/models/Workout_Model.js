const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Workout_Schema = new Schema({
    workout_name: {
        type: String,
        required: 'Sorry, workout name is required',
        trim: true,
        lowercase: true,
    },
    workout_image_link: {
        type: String,
        required: 'Sorry, image link is required',
        trim: true,
        lowercase: true,
        unique: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('Workout', Workout_Schema);