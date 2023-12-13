const express = require("express");
const router = express.Router();
const middleware = require("../middleware/auth");

const Log_Workout = require("../controllers/log_workout_controller");

router.use(middleware.logged_on);
//get all logged workout
router.get("/exercise/", Log_Workout.get_all_workouts);
router.get(
  "/exercise/:user_id",
  middleware.trainer,
  Log_Workout.get_all_workouts
);

// Get single exercise;
router.get("/exercise/:exercise_id", Log_Workout.get_workout);
router.get(
  "/exercise/:user_id/:exercise_id",
  middleware.trainer,
  Log_Workout.get_workout
);
// log workout
router.post("/exercise", Log_Workout.log_exercise);
// Update logged workout
router.patch("/exercise/:id", Log_Workout.update_logged_workout);

module.exports = router;
