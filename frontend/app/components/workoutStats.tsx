import React from "react";
import type { Workout } from "../types/workout";

const workoutStats: React.FC<{ workout: Workout }> = ({ workout }) => {
  return (
    <div className="workout-Stats relative mx-20 my-20 rounded-lg border border-black bg-white p-20 text-xl shadow-md">
      <h1 className="mb-4  text-3xl text-blue-700" text-primary="true">
        {workout.name}
      </h1>
      <p className="m-0 text-xl text-gray-600">Load (kg): {workout.load}</p>
      <p className="m-0 text-xl text-gray-600">
        Number of reps: {workout.reps}
      </p>
    </div>
  );
};

export default workoutStats;
