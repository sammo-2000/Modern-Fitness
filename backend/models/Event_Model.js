const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Event_Schema = new Schema({
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    time: { type: String, required: true, trim: true },
    capacity: { type: Number, required: true, trim: true },
    date: { type: String, required: true, trim: true },
    trainers: { type: Array, required: true, trim: true },
    url: { type: String, required: true, trim: true },
    alt: { type: String, required: true, trim: true },
}, { timestamps: true });

module.exports = mongoose.model('Event', Event_Schema);
