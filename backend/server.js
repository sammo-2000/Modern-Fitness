require('dotenv').config();
const cors = require('cors');

// Create express app
const express = require('express');
const app = express();
const mongoose = require('mongoose');

// Accept cross-origin requests from frontend
app.use(cors({
    origin: process.env.FRONTEND_FULL_DOMAIN,
    methods: 'GET,PATCH,POST,DELETE',
    credentials: true
}));

// Middleware
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method, req.body);
    next();
})

// Import routes
const auth_router = require('./routes/auth_router');
const user_router = require('./routes/user_router');

// Use routes
app.use('/api/auth', auth_router);
app.use('/api/', user_router);

// 404
app.use((req, res) => {
    res.status(404).json({
        success: false,
        massage: 'API endpoint not found'
    });
})

// Connect to DB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to database');
        // Listen to request
        app.listen(process.env.PORT, process.env.DOMAIN, () => {
            console.log(`Server started on ${process.env.DOMAIN}:${process.env.PORT}`);
        })
    })
    .catch(error => { console.error(error) });
