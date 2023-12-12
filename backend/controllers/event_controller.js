const Event_Model = require('../models/Event_Model');
const validator = require('validator');
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb')

const get_all_events = async (req, res) => {
    // Get all events after today
    const events = await Event_Model.find();

    let events_after_today = [];

    events.forEach(event => {
        const event_date = new Date(event.date);
        const today = new Date() - 1 * 24 * 60 * 60 * 1000;
        if (event_date >= today) {
            events_after_today.push(event);
        } else {
            // Delete event
            event.deleteOne({ _id: new ObjectId(event._id) })
        }
    });

    // Return response
    return res.status(200).json({ success: true, events: events_after_today });
}

const create_event = async (req, res) => {
    try {
        const { name, description, time, capacity, date, trainers, url, alt } = req.body;

        // Validate input
        ValidateData(name, description, time, capacity, date, trainers, url, alt);

        // Create event
        const event = await Event_Model.create({ name, description, time, capacity, date, trainers, alt, url });

        // Return response
        res.status(201).json({
            success: true,
            message: "Create event",
            event
        });
    } catch (error) {
        res.status(400).json({ success: false, error: error });
    }
}

const get_event = async (req, res) => {
    const { id } = req.params;
    const user_id = req._user._id;

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(400).json({ success: false, error: "Event ID invalid" });

    const event = await Event_Model.findById(id);
    if (!event) return res.status(404).json({ success: false, error: "Event not found" });

    // Count registered users
    event.current_register = event.registered_users.length

    // Check if user is registered
    const user_already_registered = event.registered_users?.includes(user_id);

    const event_data = {
        _id: event._id,
        name: event.name,
        description: event.description,
        time: event.time,
        capacity: event.capacity,
        date: event.date,
        trainers: event.trainers,
        url: event.url,
        alt: event.alt,
        current_register: event.current_register,
        registered: user_already_registered
    }

    return res.json({
        success: true,
        event: event_data
    });
}

const update_event = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, time, capacity, date, trainers, url, alt } = req.body;

        // Convert to string from int
        const capacity_string = capacity.toString();

        // Validate input
        ValidateData(name, description, time, capacity_string, date, trainers, url, alt);

        // Update event
        const event = await Event_Model.findOneAndUpdate({ _id: id }, { name, description, time, capacity: capacity_string, date, trainers, alt, url }, { new: true });
        console.log("-----------------------------" + event);
        // Return response
        res.status(200).json({
            success: true,
            message: "Update event"
        });
    } catch (error) {
        res.status(400).json({ success: false, error: error });
    }
}

const delete_event = async (req, res) => {
    // Get event ID
    const { id } = req.params;

    // Check ID is valid
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(400).json({ success: false, error: "Event ID invalid" });

    // Delete event
    await Event_Model.findByIdAndDelete(id);

    // Return response
    return res.json({
        success: true,
        message: "Delete event",
    })
}

const register = async (req, res) => {
    const { id } = req.params;
    const user_id = req._user._id;

    // Check ID is valid
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(400).json({ success: false, error: "Event ID invalid" });

    // Get all register users ID
    const event = await Event_Model.findById(id);
    if (!event) return res.status(404).json({ success: false, error: "Event not found" });

    // Check if user is already registered
    const user_already_registered = event.registered_users?.includes(user_id);

    // If user is registered, unregister
    if (user_already_registered) {
        // Remove user from registered users
        event.registered_users.pull(user_id);
        event.save();

        // Return response
        return res.json({
            success: true,
            message: "Unregister from the event",
        });
    }

    // Check event is not full
    const event_full = event.registered_users.length >= event.capacity;
    if (event_full) return res.status(400).json({ success: false, error: "Event is full" });

    // If user is not registered, register
    event.registered_users.push(user_id);
    event.save();

    // Return response
    return res.json({
        success: true,
        message: "Registered for the event",
    });
}

const ValidateData = (name, description, time, capacity, date, trainers, url, alt) => {
    // Valdiate input are sent
    if (!name) throw ("Name is required");
    if (!description) throw ("Description is required");
    if (!time) throw ("Time is required");
    if (!capacity) throw ("Capacity is required");
    if (!date) throw ("Date is required");
    if (!trainers) throw ("Trainers is required");
    if (!url) throw ("Image is required");
    if (!alt) throw ("Image description is required");

    // Validate input are correct
    // Name
    if (!validator.isLength(name, { min: 5, max: 20 }))
        throw ("Name must be between 5 and 20 characters");
    if (!/^[a-zA-Z0-9\s]*$/.test(name))
        throw ("Name must only contain letters and numbers");

    // description
    if (!validator.isLength(description, { min: 10, max: 200 }))
        throw ("Description must be between 10 and 200 characters");
    if (!/^[a-zA-Z0-9\s]*$/.test(description))
        throw ("Description must only contain letters and numbers");

    // Time
    if (!validator.isTime(time))
        throw ("Time must be a valid time");
    const time_split = time.split(":");
    const time_hour = parseInt(time_split[0]);
    if (time_hour < 7 || time_hour > 17)
        throw ("Time must be between 07:00 and 17:00");
    if (time_hour === 17 && parseInt(time_split[1]) > 0)
        throw ("Time must be between 07:00 and 17:00");

    // Capacity
    if (!validator.isInt(capacity))
        throw ("Capacity must be a number");
    if (capacity < 5 || capacity > 50)
        throw ("Capacity must be between 5 and 50");

    // Date
    if (!validator.isDate(date))
        throw ("Date must be a valid date");
    const chosen_timestamp = new Date(date).getTime();
    const two_days_ahead = Date.now() + 1 * 24 * 60 * 60 * 1000;
    if (chosen_timestamp <= two_days_ahead)
        throw ("Date must be 2 days into the future");

    // Trainers
    if (!Array.isArray(trainers))
        throw ("Trainers must be an array");
    if (trainers.length < 1)
        throw ("Trainers must have at least 1 trainer");
    for (let i = 0; i < trainers.length; i++) {
        if (!mongoose.Types.ObjectId.isValid(trainers[i]._id))
            throw ("Trainer ID invalid");
        if (!trainers[i].name)
            throw ("Trainer name is required");
        if (!/^[a-zA-Z\s]*$/.test(trainers[i].name))
            throw ("Trainer name must be letters only");
    }

    // URL
    if (!validator.isURL(url))
        throw ("Image URL invalid");

    // Alt
    if (!validator.isLength(alt, { min: 2, max: 40 }))
        throw ("Image description must be between 2 and 40 characters");
}


module.exports = {
    get_all_events,
    create_event,
    get_event,
    update_event,
    delete_event,
    register,
}