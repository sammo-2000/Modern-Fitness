const express = require('express');
const router = express.Router();
const middleware = require('../middleware/auth');
const { login, signup } = require('../controllers/auth_controller');

router.use(middleware.not_logged_on);
router.post('/login', login)
router.post('/signup', signup);

module.exports = router;