const User_Model = require('../models/User_Model');
const mongoose = require('mongoose');

const get_all_users = async (req, res) => {
    const users = await User_Model.find({}).sort({ createdAt: -1 });
    if (!users) {
        return res.status(400).json({ success: false, message: 'No users found' });
    };
    return res.status(200).json({ success: true, users });
};

const create_user = async (req, res) => {
    const { email, password, first_name, last_name } = req.body;
    try {
        // Create a new user
        const user = await User_Model.create({ email, password, first_name, last_name });
        return res.status(200).json({ success: true, user });
    } catch (error) {
        // Check for duplicate error
        if (error.code === 11000) {
            return res.status(400).json({
                success: false, message: {
                    email: "Email already exists"
                }
            });
        };
        // Check for validation errors
        return res.status(400).json({
            success: false, message: {
                email: error.errors.email ? error.errors.email.message : "",
                password: error.errors.password ? error.errors.password.message : "",
                first_name: error.errors.first_name ? error.errors.first_name.message : "",
                last_name: error.errors.last_name ? error.errors.last_name.message : ""
            }
        });
    };
};

const get_user = async (req, res) => {
    const { id } = req.params;
    // Check if the ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: 'Invalid user ID' });
    };
    const user = await User_Model.findById(id);
    // Check if the user exists
    if (!user) {
        return res.status(400).json({ success: false, message: 'User not found' });
    };
    return res.status(200).json({ success: true, user });
};

const update_user = async (req, res) => {
    const { id } = req.params
    // Check if the ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: 'Invalid user ID' });
    };
    const user = await User_Model.findOneAndUpdate({ _id: id }, {
        ...req.body
    });
    if (!user) {
        return res.status(400).json({ success: false, message: 'User not found' });
    };
    return res.status(200).json({ success: true, user });
};

const delete_user = async (req, res) => {
    const { id } = req.params
    // Check if the ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: 'Invalid user ID' });
    };
    const user = await User_Model.findOneAndDelete({ _id: id })
    if (!user) {
        return res.status(400).json({ success: false, message: 'User not found' });
    };
    return res.status(200).json({ success: true, user });
};

module.exports = {
    get_all_users,
    create_user,
    get_user,
    update_user,
    delete_user
};