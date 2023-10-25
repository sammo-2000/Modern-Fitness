require('dotenv').config();

// Create express app
const express = require('express');
const app = express();
const mongoose = require('mongoose');


// Middleware
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method, req.body);
    next();
})

// Import routes
const profile_router = require('./routes/profile_router');

// Use routes
app.use('/api/profile', profile_router);

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