const express = require('express');
const router = express.Router();
// const { login, signup } = require('../controllers/auth_controller');
const Auth = require('../controllers/auth_controller');

router.post('/login', Auth.login)
router.post('/signup', Auth.signup);

module.exports = router;