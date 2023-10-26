const Tailored_Program_Model = require('../models/Tailored_Program_Model');
const mongoose = require('mongoose');

const get_all_tailored_program = async (req, res) => {
    const tailored_program = await Tailored_Program_Model.find({}).sort({ createdAt: -1 });
    if (!tailored_program) {
        return res.status(400).json({ success: false, message: 'No tailored program found' });
    };
    return res.status(200).json({ success: true, tailored_program });
};

const create_tailored_program = async (req, res) => {
    const { date, user_id } = req.body;
    // Check if the ID is valid
    if (!mongoose.Types.ObjectId.isValid(user_id)) {
        return res.status(400).json({
            success: false, message: {
                user_id: 'Invalid user ID'
            }
        });
    };
    // Check if date is valid
    if (!is_valid_date_format(date)) {
        return res.status(400).json({
            success: false, message: {
                date: 'Invalid date format expecting YYYY-MM-DD'
            }
        });
    };
    try {
        // Create a new tailored program
        const tailored_program = await Tailored_Program_Model.create({ date, user_id });
        return res.status(200).json({ success: true, tailored_program });
    } catch (error) {
        // Check for validation errors
        return res.status(400).json({
            success: false, message: {
                date: error.errors.date ? error.errors.date.message : "",
                user_id: error.errors.user_id ? error.errors.user_id.message : ""
            }
        });
    };
};

const get_tailored_program = async (req, res) => {
    const { id } = req.params;
    // Check if the ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            success: false, message: {
                program_id: 'Invalid program ID'
            }
        });
    };
    const tailored_program = await Tailored_Program_Model.findById(id);
    // Check if the program exists
    if (!tailored_program) {
        return res.status(400).json({ success: false, message: 'Program not found' });
    };
    return res.status(200).json({ success: true, tailored_program });
};

const update_tailored_program = async (req, res) => {
    const { id } = req.params
    // Check if the ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            success: false, message: {
                program_id: 'Invalid program ID'
            }
        });
    };
    const tailored_program = await Tailored_Program_Model.findOneAndUpdate({ _id: id }, {
        ...req.body
    });
    if (!tailored_program) {
        return res.status(400).json({ success: false, message: 'Program not found' });
    };
    return res.status(200).json({ success: true, tailored_program });
};

const delete_tailored_program = async (req, res) => {
    const { id } = req.params
    // Check if the ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            success: false, message: {
                program_id: 'Invalid program ID'
            }
        });
    };
    const tailored_program = await Tailored_Program_Model.findOneAndDelete({ _id: id })
    if (!tailored_program) {
        return res.status(400).json({ success: false, message: 'Program not found' });
    };
    return res.status(200).json({ success: true, tailored_program });
};

const is_valid_date_format = (date) => {
    const dateFormat = /^\d{4}-\d{2}-\d{2}$/;
    return dateFormat.test(date);
}

module.exports = {
    get_all_tailored_program,
    create_tailored_program,
    get_tailored_program,
    update_tailored_program,
    delete_tailored_program
};