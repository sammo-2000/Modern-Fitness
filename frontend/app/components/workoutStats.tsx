import React from "react";
import { capitalizeFirstLetter } from "../utils/capitalize";
import type { Workout } from "../types/workout";

const workoutStats: React.FC<{ workout: Workout }> = ({ workout }) => {
  return (
    <div className="workout-Stats border px-8 py-4 text-xl">
      <h1 className="mb-4 text-3xl font-bold">
        {capitalizeFirstLetter(workout.name)}
      </h1>
      <p className="m-0 text-xl text-gray-600">Load (kg): {workout.load}</p>
      <p className="m-0 text-xl text-gray-600">
        Number of reps: {workout.reps}
      </p>
      <p className="m-0 text-xl text-gray-600">
        Number of sets: {workout.sets}
      </p>
    </div>
  );
};

export default workoutStats;
