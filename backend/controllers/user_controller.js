const User_Model = require('../models/User_Model');
const mongoose = require('mongoose');

const get_all_users = async (req, res) => {
    try {
        const users = await User_Model.find({}).sort({ createdAt: -1 });
        return res.status(200).json({ success: true, message: 'Get all users', data: users });
    } catch (error) {
        return res.status(400).json({ success: false, message: 'Get all users failed' });
    }
};

const create_user = async (req, res) => {
    const { email, password, first_name, last_name } = req.body;

    try {
        const user = await User_Model.create({ email, password, first_name, last_name });
        res.status(200).json({ success: true, message: 'User created', data: user });
    } catch (error) {
        res.status(400).json({ success: false, message: 'User not created', error });
    }
};

const get_user = async (req, res) => {
    const { id } = req.params;
    // Check if the ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: 'Invalid user ID' });
    }
    const user = await User_Model.findById(id);
    // Check if the user exists
    if (!user) {
        return res.status(400).json({ success: false, message: 'User not found' });
    }
    return res.status(200).json({ success: true, message: 'Get user', data: user });
}

const update_user = async (req, res) => {
    const { id } = req.params
    // Check if the ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: 'Invalid user ID' });
    }
    const user = await User_Model.findOneAndUpdate({ _id: id }, {
        ...req.body
    })
    if (!user) {
        return res.status(400).json({ success: false, message: 'User not found' });
    }
    return res.status(200).json({ success: true, message: 'Get deleted', data: user });
}

const delete_user = async (req, res) => {
    const { id } = req.params
    // Check if the ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: 'Invalid user ID' });
    }
    const user = await User_Model.findOneAndDelete({ _id: id })
    if (!user) {
        return res.status(400).json({ success: false, message: 'User not found' });
    }
    return res.status(200).json({ success: true, message: 'Get deleted', data: user });
}

module.exports = {
    get_all_users,
    create_user,
    get_user,
    update_user,
    delete_user
}