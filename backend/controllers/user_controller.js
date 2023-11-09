const User_Model = require('../models/User_Model');
const mongoose = require('mongoose');

const get_all_users = async (req, res) => {
    const { name } = req.params;
    let users = null;
    if (name) {
        // Get users by name
        users = await User_Model.find({ first_name: { $regex: name, $options: 'i' } }, { password: 0 }).sort({ createdAt: -1 }).limit(20);
    } else {
        // Get all users if no name given
        users = await User_Model.find({}, { password: 0 }).sort({ createdAt: -1 });
    }
    if (!users)
        return res.status(400).json({ success: false, message: 'No users found' });
    return res.status(200).json({ success: true, users });
};

const get_single_user = async (req, res) => {
    const { id } = req.params;
    try {
        if (!id) {
            // Own request
            const user = await User_Model.findById(req._user._id, { password: 0 });
            res.status(200).json({ success: true, user });
        } else if (id && req._user.role !== 'member') {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                // Staff request
                throw Error('Invalid user ID');
            };
            const user = await User_Model.findById(id, { password: 0 });
            if (!user) {
                throw Error('User not found');
            };
            res.status(200).json({ success: true, user });
        } else {
            res.status(401).json({ success: false, message: 'You are not authorized to view this user' });
        }
    } catch (error) {
        return res.status(400).json({ success: false, message: error ? error : 'User not found' });
    }

}

module.exports = {
    get_all_users,
    get_single_user
};

// const get_all_users = async (req, res) => {
//     const users = await User_Model.find({}, { password: 0 }).sort({ createdAt: -1 });
//     if (!users) {
//         return res.status(400).json({ success: false, message: 'No users found' });
//     };
//     return res.status(200).json({ success: true, users });
// };

// const create_user = async (req, res) => {
//     // This endpoint is moved to auth/controller -> signup
//     res.status(400).json({ success: false, message: 'API endpoint not found' });
// };

// const get_user = async (req, res) => {
//     const { id } = req.params;
//     try {
//         // Check if the ID is valid
//         if (!mongoose.Types.ObjectId.isValid(id)) {
//             throw Error('Invalid user ID');
//         };
//         const user = await User_Model.findById(id, { password: 0 });
//         // Check if the user exists
//         if (!user) {
//             throw Error('User not found');
//         };
//         return res.status(200).json({ success: true, user });
//     } catch (error) {
//         return res.status(400).json({ success: false, message: 'User not found' });
//     }
// };

// const update_user = async (req, res) => {
//     const { id } = req.params
//     // Check if the ID is valid
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//         return res.status(400).json({
//             success: false, message: {
//                 user_id: 'Invalid user ID'
//             }
//         });
//     };
//     const user = await User_Model.findOneAndUpdate({ _id: id }, {
//         ...req.body
//     });
//     if (!user) {
//         return res.status(400).json({ success: false, message: 'User not found' });
//     };
//     return res.status(200).json({ success: true, user });
// };

// const delete_user = async (req, res) => {
//     const { id } = req.params
//     // Check if the ID is valid
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//         return res.status(400).json({
//             success: false, message: {
//                 user_id: 'Invalid user ID'
//             }
//         });
//     };
//     const user = await User_Model.findOneAndDelete({ _id: id })
//     if (!user) {
//         return res.status(400).json({ success: false, message: 'User not found' });
//     };
//     return res.status(200).json({ success: true, user });
// };

// module.exports = {
//     get_all_users,
//     create_user,
//     get_user,
//     update_user,
//     delete_user
// };