const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const { get_all_workouts, create_workout, get_workout, update_workout, delete_workout } = require('../controllers/workout_controller');

router.use(auth.logged_on);
router.get('/', get_all_workouts)
router.post('/', auth.manager, create_workout);
router.get('/:id', get_workout);
router.patch('/:id', auth.manager, update_workout);
router.delete('/:id', auth.manager, delete_workout);

module.exports = router;