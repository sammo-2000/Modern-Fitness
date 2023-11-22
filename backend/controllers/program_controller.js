const Program_Model = require('../models/Program_Model');
const User_Model = require('../models/User_Model');
const mongoose = require('mongoose');
const validator = require('validator');
const send_email = require('../mail/program');

const get_all_programs = async (req, res) => {
    const { user_id } = req.params;

    if (!user_id) {
        // Member request
        // Get all the programs
        const programs = await Program_Model.find({ user_id: req._user._id }, { password: 0 }).sort({ createdAt: -1 }).limit(20);

        // Check if there are programs
        if (programs.length == 0) {
            console.log('❌ No programs found');
            return res.status(400).json({ success: false, message: "No programs found" });
        }

        // Return the programs
        console.log('✅ Get all programs successfully');
        return res.status(200).json({ success: true, programs });
    }

    // Trainer request
    // Check if user_id is valid
    if (!mongoose.Types.ObjectId.isValid(user_id))
        return res.status(400).json({ success: false, message: "Invalid user ID" });

    // Check if user_id is a member
    const user = await User_Model.findById(user_id);
    if (!user) {
        console.log('❌ User not found');
        return res.status(400).json({ success: false, message: "User not found" });
    }

    // Get all the programs
    const programs = await Program_Model.find({ user_id: user_id }, { password: 0 }).sort({ createdAt: -1 }).limit(20);

    // Check if there are programs
    if (programs.length == 0) {
        console.log('❌ No programs found');
        return res.status(400).json({ success: false, message: "No programs found" });
    }

    // Return the programs
    console.log('✅ Get all programs successfully');
    return res.status(200).json({ success: true, programs });
}

const get_program = async (req, res) => {
    const { user_id, program_id } = req.params;

    if (!user_id) {
        // Member request
        // Check if program_id is valid
        if (!mongoose.Types.ObjectId.isValid(program_id)) {
            console.log('❌ Invalid program ID');
            return res.status(400).json({ success: false, message: "Invalid program ID" });
        }

        // Get the program
        const program = await Program_Model.findById(program_id);

        // Check if program exists
        if (!program) {
            console.log('❌ Program not found');
            return res.status(400).json({ success: false, message: 'Program not found' });
        }

        // Check if program belongs to user
        if (program.user_id !== req._user.id && req._user.role !== 'trainer') {
            console.log('❌ Unauthorized to view this program');
            return res.status(401).json({ success: false, message: 'Unauthorized to view this program' });
        }

        // Return the program
        console.log('✅ Get program successfully');
        return res.status(200).json({ success: true, program });
    }

    // Trainer request
    // Check if user_id is valid
    if (!mongoose.Types.ObjectId.isValid(user_id)) {
        console.log('❌ Invalid user ID');
        return res.status(400).json({ success: false, message: "Invalid user ID" });
    }

    // Check if user_id is a member
    const user = await User_Model.findById(user_id);
    if (!user) {
        console.log('❌ User not found');
        return res.status(400).json({ success: false, message: "User not found" });
    }

    // Check if program_id is valid
    if (!mongoose.Types.ObjectId.isValid(program_id)) {
        console.log('❌ Invalid program ID');
        return res.status(400).json({ success: false, message: "Invalid program ID" });
    }

    // Get the program
    const program = await Program_Model.findById(program_id);

    // Check if program exists
    if (!program) {
        console.log('❌ Program not found');
        return res.status(400).json({ success: false, message: "Program not found" });
    }

    // Return the program
    console.log('✅ Get program successfully');
    return res.status(200).json({ success: true, program });
}

const create_program = async (req, res) => {
    const { user_id, date, workout } = req.body;
    try {
        // Validate program
        const user = await validate_program(user_id, date, workout);

        // Create a new program
        const program = await Program_Model.create({ user_id, date, workout });

        // Send email
        send_email.sendEmail(user);

        console.log('✅ Create program successfully');
        return res.status(200).json({ success: true, program });
    } catch (error) {
        console.log('❌ Create program failed');
        return res.status(400).json({ success: false, message: error.message });
    }
}

const update_program = async (req, res) => {
    const { user_id, date, workout } = req.body;
    const { id } = req.params;

    try {
        // Validate program
        await validate_program(user_id, date, workout);

        // Validate program_id
        if (!mongoose.Types.ObjectId.isValid(id)) {
            console.log('❌ Invalid program ID');
            return res.status(400).json({ success: false, message: "Invalid program ID" });
        }

        // Create a new program
        const program = await Program_Model.findOneAndUpdate({ _id: id }, { user_id, date, workout }, { new: true });

        console.log('✅ Update program successfully');
        return res.status(200).json({ success: true, program });
    } catch (error) {
        console.log('❌ Update program failed');
        return res.status(400).json({ success: false, message: error.message });
    }
}

const validate_program = async (user_id, date, workout) => {
    // Check if user_id is valid
    if (!mongoose.Types.ObjectId.isValid(user_id))
        throw Error('Invalid user ID');

    // Check if user_id is a member
    const user = await User_Model.findById(user_id);
    if (!user)
        throw Error('User not found');

    // Check if date is valid
    if (!validator.isDate(date))
        throw Error('Invalid date format must be YYYY-MM-DD');

    // Check if workout is valid
    if (!Array.isArray(workout))
        throw Error('Workout is required');

    if (workout.length == 0)
        throw Error('Workout is required');

    workout.forEach(element => {
        if (!element.name)
            throw Error('Workout name is required');

        if (!element.load)
            throw Error('Workout load is required');

        if (!element.load < 0)
            throw Error('Workout load must be greater than 0');

        if (!validator.isNumeric(element.load))
            throw Error('Workout load must only contain numbers');

        if (!element.reps)
            throw Error('Workout reps is required');

        if (!element.reps < 0)
            throw Error('Workout reps must be greater than 0');

        if (!validator.isNumeric(element.reps))
            throw Error('Workout reps must only contain numbers');
    });

    return user;
}

module.exports = {
    get_all_programs,
    get_program,
    create_program,
    update_program
}