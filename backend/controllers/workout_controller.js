const Workout_Model = require('../models/Workout_Model');
const mongoose = require('mongoose');

const get_all_workouts = async (req, res) => {
    const workout = await Workout_Model.find({}).sort({ createdAt: -1 });
    if (!workout) {
        return res.status(400).json({ success: false, message: 'No workouts found' });
    };
    return res.status(200).json({ success: true, workout });
};

const create_workout = async (req, res) => {
    const { workout_name, workout_image_link, workout_description } = req.body;
    try {
        // Create a new workout
        const workout = await Workout_Model.create({ workout_name, workout_image_link, workout_description });
        return res.status(200).json({ success: true, workout });
    } catch (error) {
        // Check for validation errors
        return res.status(400).json({
            success: false, message: {
                workout_name: error.errors.workout_name ? error.errors.workout_name.message : "",
                workout_image_link: error.errors.workout_image_link ? error.errors.workout_image_link.message : "",
                workout_description: error.errors.workout_description ? error.errors.workout_description.message : "",
            }
        });
    };
};

const get_workout = async (req, res) => {
    const { id } = req.params;
    // Check if the ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            success: false, message: {
                work_id: 'Invalid work ID'
            }
        });
    };
    const workout = await Workout_Model.findById(id);
    // Check if the workout exists
    if (!workout) {
        return res.status(400).json({ success: false, message: 'Workout not found' });
    };
    return res.status(200).json({ success: true, workout });
};

const update_workout = async (req, res) => {
    const { id } = req.params
    // Check if the ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            success: false, message: {
                work_id: 'Invalid work ID'
            }
        });
    };
    const workout = await Workout_Model.findOneAndUpdate({ _id: id }, {
        ...req.body
    });
    if (!workout) {
        return res.status(400).json({ success: false, message: 'Workout not found' });
    };
    return res.status(200).json({ success: true, workout });
};

const delete_workout = async (req, res) => {
    const { id } = req.params
    // Check if the ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            success: false, message: {
                work_id: 'Invalid work ID'
            }
        });
    };
    const workout = await Workout_Model.findOneAndDelete({ _id: id })
    if (!workout) {
        return res.status(400).json({ success: false, message: 'Workout not found' });
    };
    return res.status(200).json({ success: true, workout });
};

module.exports = {
    get_all_workouts,
    create_workout,
    get_workout,
    update_workout,
    delete_workout
};