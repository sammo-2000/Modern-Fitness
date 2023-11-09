const express = require('express');
const router = express.Router();
const middleware = require('../middleware/auth');
const { get_all_users, get_single_user, edit_user } = require('../controllers/user_controller');

router.use(middleware.logged_on);
// Get list of user
router.get('/users/', middleware.staff, get_all_users);
router.get('/users/:name', middleware.staff, get_all_users);
// Get single user
router.get('/user/', get_single_user);
router.get('/user/:id', middleware.staff, get_single_user);
router.patch('/user', edit_user);
router.patch('/user/:id', middleware.trainer, edit_user);
// Update user


// const { get_all_users, create_user, get_user, update_user, delete_user } = require('../controllers/user_controller');

// router.use(middleware.logged_on);
// router.get('/', middleware.staff, get_all_users);
// router.get('/:id', get_user);
// router.patch('/:id', update_user);
// router.delete('/:id', delete_user);

module.exports = router;