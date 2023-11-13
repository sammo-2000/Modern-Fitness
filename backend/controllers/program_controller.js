const Program_Model = require('../models/Program_Model');
const User_Model = require('../models/User_Model');
const mongoose = require('mongoose');
const validator = require('validator');

const get_all_programs = async (req, res) => {
    const { user_id } = req.params;

    if (!user_id) {
        // Member request
        // Get all the programs
        const programs = await Program_Model.find({ user_id: req._user._id }, { password: 0 }).sort({ createdAt: -1 }).limit(20);

        // Check if there are programs
        if (programs.length == 0)
            return res.status(400).json({ success: false, message: "No programs found" });

        // Return the programs
        return res.status(200).json({ success: true, programs });
    }

    // Trainer request
    // Check if user_id is valid
    if (!mongoose.Types.ObjectId.isValid(user_id))
        return res.status(400).json({ success: false, message: "Invalid user ID" });

    // Check if user_id is a member
    const user = await User_Model.findById(user_id);
    if (!user)
        return res.status(400).json({ success: false, message: "User not found" });

    // Get all the programs
    const programs = await Program_Model.find({ user_id: user_id }, { password: 0 }).sort({ createdAt: -1 }).limit(20);

    // Check if there are programs
    if (programs.length == 0)
        return res.status(400).json({ success: false, message: "No programs found" });

    // Return the programs
    return res.status(200).json({ success: true, programs });
}

const get_program = async (req, res) => {
    const { user_id, program_id } = req.params;

    if (!user_id) {
        // Member request
        // Check if program_id is valid
        if (!mongoose.Types.ObjectId.isValid(program_id))
            return res.status(400).json({ success: false, message: "Invalid program ID" });

        // Get the program
        const program = await Program_Model.findById(program_id);

        // Check if program exists
        if (!program)
            return res.status(400).json({ success: false, message: "Program not found" });

        // Return the program
        return res.status(200).json({ success: true, program });
    }

    // Trainer request
    // Check if user_id is valid
    if (!mongoose.Types.ObjectId.isValid(user_id))
        return res.status(400).json({ success: false, message: "Invalid user ID" });

    // Check if user_id is a member
    const user = await User_Model.findById(user_id);
    if (!user)
        return res.status(400).json({ success: false, message: "User not found" });

    // Check if program_id is valid
    if (!mongoose.Types.ObjectId.isValid(program_id))
        return res.status(400).json({ success: false, message: "Invalid program ID" });

    // Get the program
    const program = await Program_Model.findById(program_id);

    // Check if program exists
    if (!program)
        return res.status(400).json({ success: false, message: "Program not found" });

    // Return the program
    return res.status(200).json({ success: true, program });
}

const create_program = async (req, res) => {

}

const update_program = async (req, res) => {

}

const delete_program = async (req, res) => {

}

module.exports = {
    get_all_programs,
    get_program,
    create_program,
    update_program,
    delete_program
}