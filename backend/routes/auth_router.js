const express = require('express');
const router = express.Router();
const Auth = require('../controllers/auth_controller');
const middleware = require('../middleware/auth');

router.post('/login', Auth.login)
router.post('/signup', Auth.signup);
router.post('/signup/:trainer', middleware.logged_on, middleware.manager, Auth.signup);

module.exports = router;