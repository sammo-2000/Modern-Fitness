const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Program_Schema = new Schema({
    user_id: { type: String, required: true, trim: true },
    date: { type: String, required: true, trim: true },
    programs: { type: Array, required: true, trim: true },
}, { timestamps: true });

module.exports = mongoose.model('Program', Program_Schema);
