const jwt = require('jsonwebtoken');
const User_Model = require('../models/User_Model');

const logged_on = async (req, res, next) => {
    try {
        const { authorization } = req.headers;

        if (!authorization) {
            throw Error('You must send an authorization header');
        }

        const token = authorization.split(' ')[1];
        const { id } = jwt.verify(token, process.env.SECRET_TOKEN);
        req._user = await User_Model.findById(id).select('_id role');
        next();
    } catch (error) {
        return res.status(401).json({ error: error.message });
    }
}

const staff = async (req, res, next) => {
    if (req._user.role !== 'trainer' && req._user.role !== 'manager') {
        return res.status(401).json({ error: 'You must be a staff to access this resource' });
    }
    next();
}

const manager = async (req, res, next) => {
    if (req._user.role !== 'manager') {
        return res.status(401).json({ error: 'You must be a manager to access this resource' });
    }
    next();
}

module.exports = { logged_on, staff, manager };