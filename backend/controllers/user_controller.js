const User_Model = require('../models/User_Model');
const Program_Model = require('../models/Program_Model');
const mongoose = require('mongoose');
const validator = require('validator');

const get_all_users = async (req, res) => {
    const { name } = req.params;
    let users = null;
    if (name) {
        // Get users by first name
        users_list = await User_Model.find({ first_name: { $regex: name, $options: 'i' } }, { password: 0 }).sort({ createdAt: -1 }).limit(20);
        users = await Promise.all(users_list.map(async (user) => {
            const has_program = await has_custom_program(user._id);
            return {
                ...user.toObject(),
                has_program: has_program
            }
        }))
    } else {
        // Get all users if no name given
        users_list = await User_Model.find({}, { password: 0 }).sort({ createdAt: -1 }).limit(20);
        users = await Promise.all(users_list.map(async (user) => {
            const has_program = await has_custom_program(user._id);
            return {
                ...user.toObject(),
                has_program: has_program
            }
        }))
    }
    if (!users) {
        console.log('❌ No users found');
        return res.status(400).json({ success: false, message: 'No users found' });
    }
    console.log('✅ Get all users successfully');
    return res.status(200).json({ success: true, users });
};

const get_single_user = async (req, res) => {
    const { id } = req.params;
    try {
        if (!id) {
            // Own request
            const user = await User_Model.findById(req._user._id, { password: 0 });
            console.log('✅ Get own user successfully');
            res.status(200).json({ success: true, user });
        } else if (id && req._user.role !== 'member') {
            if (!mongoose.Types.ObjectId.isValid(id))
                throw Error('Invalid user ID');

            const user = await User_Model.findById(id, { password: 0 });
            if (!user)
                throw Error('User not found');
            console.log('✅ Get single user successfully');
            res.status(200).json({ success: true, user });
        } else {
            console.log('❌ You are not authorized to view this user');
            res.status(401).json({ success: false, message: 'You are not authorized to view this user' });
        }
    } catch (error) {
        console.log('❌ Get single user failed');
        return res.status(400).json({ success: false, message: error ? error : 'User not found' });
    }
}

const edit_user = async (req, res) => {
    const { id } = req.params;
    const { email, goal, note, height, weight, vegan, allergy } = req.body;
    try {
        if (!id) {
            // Own request

            // Check if the email is valid
            if (email && !validator.isEmail(email))
                throw Error('Invalid email');

            // Check if the goal is valid
            if (goal && !/^[a-zA-Z0-9\s]*$/.test(goal))
                throw Error('Goal must only contain letters and numbers');

            // Check if the height is valid
            if (height && !validator.isNumeric(height))
                throw Error('Height must only contain numbers');

            // Check if the weight is valid
            if (weight && !validator.isNumeric(weight))
                throw Error('Weight must only contain numbers');

            // Check if the vegan is valid
            if (vegan && !validator.isBoolean(vegan))
                throw Error('Vegan must be a boolean');

            // Check if the allergy is valid
            if (allergy && !/^[a-zA-Z\s]*$/.test(allergy))
                throw Error('Allergy must only contain letters');

            const allowed_fields = {};
            if (email) allowed_fields.email = email;
            if (goal) allowed_fields.goal = goal;
            if (height) allowed_fields.height = height;
            if (weight) allowed_fields.weight = weight;
            if (vegan) allowed_fields.vegan = vegan;
            if (allergy) allowed_fields.allergy = allergy;

            // Update user
            const user = await User_Model.findOneAndUpdate({ _id: req._user._id }, allowed_fields, { new: true });
            console.log('✅ Edit own user successfully');
            return res.status(200).json({ success: true, user });
        } else if (id && req._user.role === 'trainer') {
            // Trainer request

            // Check if the ID is valid
            if (!mongoose.Types.ObjectId.isValid(id))
                throw Error('Invalid user ID');

            // Check if note is provided
            if (!note)
                throw Error('Note is required');

            // Check if the note is valid
            if (note && !/^[a-zA-Z0-9\s]*$/.test(note))
                throw Error('Note must only contain letters and numbers');

            // Update user
            const user = await User_Model.findOneAndUpdate({ _id: id }, { note }, { new: true });
            console.log('✅ Edit user successfully');
            return res.status(200).json({ success: true, user });
        } else {
            console.log('❌ You are not authorized to edit this user');
            res.status(401).json({ success: false, message: 'You are not authorized to edit this user' });
        }
    } catch (error) {
        console.log('❌ Edit user failed');
        return res.status(400).json({ success: false, message: error.message });
    }
}

const delele_user = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        // Own request

        // Verify user password

        // Delete user

        // TODO
    } else {
        // Manager request

        // Check if the ID is valid

        // Verify manager password

        // Verify user name

        // Delete user

        // TODO
    }
}

const has_custom_program = async (user_id) => {
    const has_program = await Program_Model.exists({ user_id });
    if (has_program)
        return true;
    return false;
};

module.exports = {
    get_all_users,
    get_single_user,
    edit_user,
    delele_user
};