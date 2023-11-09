const express = require('express');
const router = express.Router();
const middleware = require('../middleware/auth');
const { get_all_users, create_user, get_user, update_user, delete_user } = require('../controllers/user_controller');

router.use(middleware.logged_on);
router.get('/', get_all_users);
// router.post('/', create_user); THIS ROUTE IS MOVED TO AUTH SIGNUP
router.get('/:id', get_user);
router.patch('/:id', update_user);
router.delete('/:id', delete_user);

module.exports = router;