const User_Model = require('../models/User_Model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const validator = require('validator');

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Check if email and password are provided
        if (!email || !password) {
            throw Error('Missing required fields');
        }

        // Check if email is valid
        const user = await User_Model.findOne({ email });
        if (!user) {
            throw Error('Incorrect credentials');
        }

        // Check if password is valid
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
    const { email, password, first_name, last_name } = req.body;
    try {
        // Check if email, password, first_name, last_name are provided
        if (!email || !password || !first_name || !last_name) {
            throw Error('Missing required fields');
        }

        // Check if email is valid
        if (!validator.isEmail(email)) {
            throw Error('Invalid email address');
        }

        // Check if password is strong
        if (!validator.isStrongPassword(password, {
            minSymbols: 0,
            minUppercase: 0,
        })) {
            throw Error('Password is too weak');
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
        const user = await User_Model.create({ email, password: hash, first_name, last_name });

        // Create token
        const token = createToken(user._id);

        // Return response
        return res.status(200).json({ success: true, message: 'Signup successfully', token, user });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    };
}

const createToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET_TOKEN, { expiresIn: '7d' })
}

module.exports = {
    login,
    signup
};