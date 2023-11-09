const User_Model = require('../models/User_Model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const validator = require('validator');
const send_email = require('../mail/welcome');

const login = async (req, res) => {
    const { User_identifier, password } = req.body;
    try {
        // Check if email is provided
        if (!User_identifier) {
            throw Error('User Identifier is required');
        }

        // Check if password is provided
        if (!password) {
            throw Error('Password is required');
        }

        // Check if email is valid
        let user = await User_Model.findOne({ email: User_identifier });
        if (!user) {
            user = await User_Model.findOne({ access_code: User_identifier });
            if (!user) {
                throw Error('Incorrect credentials');
            }
        }

        // Check if password is correct
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            throw Error('Incorrect credentials');
        }

        // Create token
        const token = createToken(user._id);

        // Return response
        return res.status(200).json({ success: true, message: 'Login successfully', token, user });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    };
}

const signup = async (req, res) => {
    const { email, password, first_name, last_name, gender, dob } = req.body;
    try {
        // Check if email is provided
        if (!email) {
            throw Error('Email is required');
        }

        // Check if password is provided
        if (!password) {
            throw Error('Password is required');
        }

        // Check if first_name is provided
        if (!first_name) {
            throw Error('First Name is required');
        }

        // Check if last_name is provided
        if (!last_name) {
            throw Error('Last Name is required');
        }

        // Check if gender is provided
        if (!gender) {
            throw Error('Gender is required')
        }

        // Check if dob is provided
        if (!dob) {
            throw Error('Date of birth is required')
        }

        // Check if email is valid
        if (!validator.isEmail(email)) {
            throw Error('Invalid email address');
        }

        // Check if password is strong
        if (!validator.isStrongPassword(password)) {
            throw Error('Password is too weak - must be at least 8 characters long and contain at least 1 lowercase, 1 uppercase, 1 number and 1 symbol');
        }

        // Check gender is male/female or other
        if (gender !== 'male' && gender !== 'female' && gender !== 'other') {
            throw Error('Gender invalid');
        }

        // Check if dob is valid
        if (!validator.isDate(dob)) {
            throw Error('Invalid date of birth, YYYY-MM-DD format required');
        }

        // Check if email already exists
        const exists = await User_Model.findOne({ email });
        if (exists) {
            throw Error('Email address already exists');
        }

        // Create hash password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        // Create user
        const user = await User_Model.create({ email, password: hash, first_name, last_name, gender, dob });

        // Create token
        const token = createToken(user._id);

        // Send email
        send_email.sendEmail(email, first_name, last_name, user.access_code);

        // Return response
        return res.status(200).json({ success: true, message: 'Signup successfully', token, user });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    };
}

const createToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET_TOKEN, { expiresIn: '14d' })
}

module.exports = {
    login,
    signup
};