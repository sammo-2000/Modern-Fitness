const express = require("express");
const router = express.Router();
const middleware = require("../middleware/auth");
// const { get_all_users, get_single_user, edit_user, delele_user } = require('../controllers/user_controller');
const User = require("../controllers/user_controller");

router.use(middleware.logged_on);
// Get list of user
router.get("/users/", middleware.staff, User.get_all_users);
router.get("/users/:name", middleware.staff, User.get_all_users);
router.get("/get-all-trainers", middleware.staff, User.get_all_trainers);
// Get single user
router.get("/user/", User.get_single_user);
router.get("/user/:id", middleware.staff, User.get_single_user);
// Update user
router.patch("/user", User.edit_user);
router.patch("/user/:id", middleware.trainer, User.edit_user);
// Delete user
router.delete("/user/", User.delele_user);
router.delete("/user/:id", middleware.manager, User.delele_user);

module.exports = router;
