const express = require('express');
const router = express.Router();
const middleware = require('../middleware/auth');
const { get_all_users } = require('../controllers/user_controller');

router.use(middleware.logged_on);
router.get('/', middleware.staff, get_all_users);
router.get('/:name', middleware.staff, get_all_users);


// const { get_all_users, create_user, get_user, update_user, delete_user } = require('../controllers/user_controller');

// router.use(middleware.logged_on);
// router.get('/', middleware.staff, get_all_users);
// router.get('/:id', get_user);
// router.patch('/:id', update_user);
// router.delete('/:id', delete_user);

module.exports = router;