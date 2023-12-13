const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Workout_Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    sets: { type: Number, required: true, trim: true },
    reps: { type: Number, required: true, trim: true },
    load: { type: Number, required: true, trim: true },
  },
  { timestamps: true }
);

const Program_Schema = new Schema(
  {
    user_id: { type: String, required: true, trim: true },
    date: { type: String, required: true, trim: true },
    workout: { type: [Workout_Schema], required: true, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Program", Program_Schema);
