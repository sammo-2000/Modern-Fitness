const express = require('express');
const router = express.Router();
const { get_all_workouts, create_workout, get_workout, update_workout, delete_workout } = require('../controllers/workout_controller');

router.get('/', get_all_workouts)
router.post('/', create_workout);
router.get('/:id', get_workout);
router.patch('/:id', update_workout);
router.delete('/:id', delete_workout);

module.exports = router;