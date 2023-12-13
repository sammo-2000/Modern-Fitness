const Log_Workout_Model = require("../models/Log_Workout_Model");
const User_Model = require("../models/User_Model");
const mongoose = require("mongoose");
const validator = require("validator");

const get_all_workouts = async (req, res) => {
  const { user_id } = req.params;

  if (!user_id) {
    // Member request
    // Get all the programs
    const workout = await Log_Workout_Model.find(
      { user_id: req._user._id },
      { password: 0 }
    )
      .sort({ createdAt: -1 })
      .limit(20);

    // Check if there are programs
    if (workout.length == 0) {
      console.log("❌No logged workout found");
      return res
        .status(400)
        .json({ success: false, message: "No logged workout found" });
    }

    // Return the programs
    console.log("✅ retrieved all logged workout successfully");
    return res.status(200).json({ success: true, workout });
  }

  // Trainer request
  // Check if user_id is valid
  if (!mongoose.Types.ObjectId.isValid(user_id))
    return res.status(400).json({ success: false, message: "Invalid user ID" });

  // Check if user_id is a member
  const user = await User_Model.findById(user_id);
  if (!user) {
    console.log("❌ User not found");
    return res.status(400).json({ success: false, message: "User not found" });
  }

  // Get all the programs
  const workout = await Log_Workout_Model.find(
    { user_id: user_id },
    { password: 0 }
  )
    .sort({ createdAt: -1 })
    .limit(20);

  // Check if there are programs
  //   if (workout.length == 0) {
  //     console.log("❌ No logged workout found");
  //     return res
  //       .status(400)
  //       .json({ success: false, message: "No logged workout found" });
  //   }

  //   // Return the programs
  //   console.log("✅ retrieved all logged workout successfully");
  //   return res.status(200).json({ success: true, workout });
};

const get_workout = async (req, res) => {
  const { user_id, exercise_id } = req.params;

  if (!user_id) {
    // Member request
    // Check if program_id is valid
    if (!mongoose.Types.ObjectId.isValid(exercise_id)) {
      console.log("❌ Invalid exercise ID");
      return res
        .status(400)
        .json({ success: false, message: "Invalid exercise ID" });
    }

    // Get the program
    const logged_exercise = await Log_Workout_Model.findById(exercise_id);

    // Check if program exists
    if (!logged_exercise) {
      console.log("❌ exercise not found");
      return res
        .status(400)
        .json({ success: false, message: "exercise not found" });
    }

    // Check if program belongs to user
    if (logged_exercise.user_id !== req._user.id) {
      console.log("❌ Unauthorized to view this program");
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized to view this program" });
    }

    // Return the program
    console.log("✅ Get exercise successfully");
    return res.status(200).json({ success: true, logged_exercise });
  }

  // Trainer request
  // Check if user_id is valid
  if (!mongoose.Types.ObjectId.isValid(user_id)) {
    console.log("❌ Invalid user ID");
    return res.status(400).json({ success: false, message: "Invalid user ID" });
  }

  // Check if user_id is a member
  const user = await User_Model.findById(user_id);
  if (!user) {
    console.log("❌ User not found");
    return res.status(400).json({ success: false, message: "User not found" });
  }

  // Check if program_id is valid
  if (!mongoose.Types.ObjectId.isValid(exercise_id)) {
    console.log("❌ Invalid program ID");
    return res
      .status(400)
      .json({ success: false, message: "Invalid exercise ID" });
  }

  // Get the program
  const logged_exercise = await Log_Workout_Model.findById(exercise_id);

  // Check if program exists
  if (!logged_exercise) {
    console.log("❌ no exercise found");
    return res
      .status(400)
      .json({ success: false, message: "no exercise found" });
  }

  // Return the program
  console.log("✅ Got exercise successfully");
  return res.status(200).json({ success: true, logged_exercise });
};

const log_exercise = async (req, res) => {
  const { logged_workout } = req.body;
  const user_id = req._user._id;
  try {
    // Validate program
    const user = await validate_exercise(user_id, logged_workout);

    // Create a new program
    const exercise = await Log_Workout_Model.create({
      user_id,
      logged_workout,
    });

    // Send email
    //send_email.sendEmail(user);

    console.log("✅ exercise logged successfully");
    return res.status(200).json({ success: true, exercise });
  } catch (error) {
    console.log("❌ exercise log failed");
    return res.status(400).json({ success: false, message: error.message });
  }
};

const update_logged_workout = async (req, res) => {
  const { logged_workout } = req.body;
  const { id } = req.params;
  const user_id = req._user._id;

  try {
    // Validate program
    await validate_exercise(user_id, logged_workout);

    // Validate program_id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log("❌ Invalid program ID");
      return res
        .status(400)
        .json({ success: false, message: "Invalid program ID" });
    }

    // Create a new program
    const exercise = await Log_Workout_Model.findOneAndUpdate(
      { _id: id },
      { user_id, logged_workout },
      { new: true }
    );

    console.log("✅ Update logged exercise successfully");
    return res.status(200).json({ success: true, exercise });
  } catch (error) {
    console.log("❌ Update exercise failed");
    return res.status(400).json({ success: false, message: error.message });
  }
};

const validate_exercise = async (user_id, logged_workout) => {
  // Check if user_id is valid
  if (!mongoose.Types.ObjectId.isValid(user_id)) throw Error("Invalid user ID");

  // Check if user_id is a member
  const user = await User_Model.findById(user_id);
  if (!user) throw Error("User not found");

  // Check if workout is valid
  if (!Array.isArray(logged_workout)) throw Error("Workout is required");

  if (logged_workout.length == 0) throw Error("Workout is required");

  logged_workout.forEach((element) => {
    if (!element.exercise) throw Error("exercise is required");
    if (!element.week) throw Error("week is required");

    if (!element.loads) throw Error("Workout load is required");

    if (!element.loads < 0) throw Error("Workout load must be greater than 0");

    if (!validator.isNumeric(element.loads))
      throw Error("Workout load must only contain numbers");

    if (!element.reps) throw Error("Workout reps is required");

    if (!element.reps < 0) throw Error("Workout reps must be greater than 0");

    if (!validator.isNumeric(element.reps))
      throw Error("Workout reps must only contain numbers");

    if (!element.sets) throw Error("Workout sets is required");

    if (!element.sets < 0) throw Error("Workout sets must be greater than 0");

    if (!validator.isNumeric(element.sets))
      throw Error("Workout sets must only contain numbers");
  });

  return user;
};

module.exports = {
  get_workout,
  log_exercise,
  get_all_workouts,
  update_logged_workout,
};
