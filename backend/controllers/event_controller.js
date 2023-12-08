const Event_Model = require('../models/Event_Model');
const validator = require('validator');
const mongoose = require('mongoose');

const get_events = async (req, res) => {
    res.json({
        success: true,
        message: "Get all events",
    });
}

const create_event = async (req, res) => {
    const { name, description, time, capacity, date, trainers } = req.body;

    // Valdiate input are sent
    if (!name) return res.status(400).json({ success: false, error: "Name is required" });
    if (!description) return res.status(400).json({ success: false, error: "description is required" });
    if (!time) return res.status(400).json({ success: false, error: "Time is required" });
    if (!capacity) return res.status(400).json({ success: false, error: "Capacity is required" });
    if (!date) return res.status(400).json({ success: false, error: "Date is required" });
    if (!trainers) return res.status(400).json({ success: false, error: "Trainers is required" });

    // Validate input are correct
    // Name
    if (!validator.isLength(name, { min: 5, max: 20 }))
        return res.status(400).json({ success: false, error: "Name must be between 5 and 20 characters" });
    if (!/^[a-zA-Z0-9\s]*$/.test(name))
        return res.status(400).json({ success: false, error: "Name must only contain letters and numbers" });

    // description
    if (!validator.isLength(description, { min: 10, max: 200 }))
        return res.status(400).json({ success: false, error: "Description must be between 10 and 200 characters" });
    if (!/^[a-zA-Z0-9\s]*$/.test(description))
        return res.status(400).json({ success: false, error: "Description must only contain letters and numbers" });

    // Time
    if (!validator.isTime(time))
        return res.status(400).json({ success: false, error: "Time must be a valid time" });
    const time_split = time.split(":");
    const time_hour = parseInt(time_split[0]);
    if (time_hour < 7 || time_hour > 17)
        return res.status(400).json({ success: false, error: "Time must be between 07:00 and 17:00" });
    if (time_hour === 17 && parseInt(time_split[1]) > 0)
        return res.status(400).json({ success: false, error: "Time must be between 07:00 and 17:00" });

    // Capacity
    if (!validator.isInt(capacity))
        return res.status(400).json({ success: false, error: "Capacity must be a number" });
    if (capacity < 5 || capacity > 50)
        return res.status(400).json({ success: false, error: "Capacity must be between 5 and 50" });

    // Date
    if (!validator.isDate(date))
        return res.status(400).json({ success: false, error: "Date must be a valid date" });
    const chosen_timestamp = new Date(date).getTime();
    const two_days_ahead = Date.now() + 1 * 24 * 60 * 60 * 1000;
    if (chosen_timestamp <= two_days_ahead)
        return res.status(400).json({ success: false, error: "Date must be 2 days into future" });

    // Trainers
    if (!Array.isArray(trainers))
        return res.status(400).json({ success: false, error: "Trainers must be an array" });
    if (trainers.length < 1)
        return res.status(400).json({ success: false, error: "Trainers must have at least 1 trainer" });
    for (let i = 0; i < trainers.length; i++) {
        if (!mongoose.Types.ObjectId.isValid(trainers[i]._id))
            return res.status(400).json({ success: false, error: "Trainer ID invalid" });
        if (!trainers[i].name)
            return res.status(400).json({ success: false, error: "Trainer name is required" });
        if (!/^[a-zA-Z\s]*$/.test(trainers[i].name))
            return res.status(400).json({ success: false, error: "Trainer name must be letters only" });
    }

    // Create event
    const event = await Event_Model.create({ name, description, time, capacity, date, trainers });

    // Return response
    res.status(201).json({
        success: true,
        message: "Create event",
        event
    });
}

const get_event = async (req, res) => {
    res.json({
        success: true,
        message: "Get event",
    });
}

const update_event = async (req, res) => {
    res.json({
        success: true,
        message: "Update event",
    });
}

const delete_event = async (req, res) => {
    res.json({
        success: true,
        message: "Delete event",
    });
}

module.exports = {
    get_events,
    create_event,
    get_event,
    update_event,
    delete_event,
}