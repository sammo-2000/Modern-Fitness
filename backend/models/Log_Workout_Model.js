const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Exercise_Schema = new Schema(
  {
    user_id: { type: String, required: true, trim: true },

    logged_workout: { type: Array, required: true, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Exercise", Exercise_Schema);
