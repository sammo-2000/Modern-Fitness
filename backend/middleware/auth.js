const jwt = require('jsonwebtoken');
const User_Model = require('../models/User_Model');

const logged_on = async (req, res, next) => {
    try {
        // This should be turned off for testing
        // const { authorization } = req.headers;
        // if (!authorization) {
        //     throw Error('You must send an authorization header');
        // }
        // const token = authorization.split(' ')[1];

        const token = Users_Type();
        const { id } = jwt.verify(token, process.env.SECRET_TOKEN);
        req._user = await User_Model.findById(id).select('_id role');
        next();
    } catch (error) {
        return res.status(401).json({ error: error.message });
    }
}

const not_logged_on = async (req, res, next) => {
    // const { authorization } = req.headers;
    const authorization = Users_Type();
    if (authorization) {
        return res.status(401).json({ error: 'This resource is only accessible to non-logged-in users' });
    }
    next();
}

const staff = async (req, res, next) => {
    if (req._user.role !== 'trainer' && req._user.role !== 'manager') {
        return res.status(401).json({ error: 'This resource is only accessible to staff members' });
    }
    next();
}

const trainer = async (req, res, next) => {
    if (req._user.role !== 'trainer') {
        return res.status(401).json({ error: 'This resource is only accessible to trainer' });
    }
    next();
}

const manager = async (req, res, next) => {
    if (req._user.role !== 'manager') {
        return res.status(401).json({ error: 'This resource is only accessible to managers' });
    }
    next();
}

// This function is for testing purposes only
const Users_Type = () => {
    userType = 'trainer'
    switch (userType) {
        case 'member': return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NGQxYjAzODA3NzkxNGEyNzUyOWYwYSIsImlhdCI6MTY5OTU1MzY0NCwiZXhwIjoxNzAwNzYzMjQ0fQ.NArIYw1EcOqDt5Mr7WOjppSHudrt10U45m47ij3VwIY'
        case 'trainer': return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NGQxYWU2ODA3NzkxNGEyNzUyOWYwNiIsImlhdCI6MTY5OTU1MzY3MiwiZXhwIjoxNzAwNzYzMjcyfQ.sxxjBrLXQ089o87ojlopXtjyqjQIyhL92qB48r8br9c'
        case 'manager': return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NGQxYWE4ODA3NzkxNGEyNzUyOWYwMyIsImlhdCI6MTY5OTU1MzYwOSwiZXhwIjoxNzAwNzYzMjA5fQ.5iGvDwpCTUyfyt6jkc4sr0ogqTqTKV4Yxj3LZoAdaWs'
        default: return null
    }
}

module.exports = { logged_on, not_logged_on, staff, manager, trainer };