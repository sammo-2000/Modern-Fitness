// code reference: https://www.youtube.com/watch?v=tRmeik-IpUQ&list=PL4cUxeGkcC9iJ_KkrkBZWZRHVwnzLIoUE&index=10
import React from "react";
import { capitalizeFirstLetter } from "../utils/capitalize";
import { useFetchedData } from "../context/MemberIdContext";
import type { Workout } from "../types/workout";
import Button from "../components/Button";
import Link from "next/link";

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
      <p className="m-0 text-xl text-gray-600">
        Times Workout to be Completed in a Week: {workout.log}
      </p>

      <Link href={`/members/${workout._id}/editWorkout`}>
        <button
          className="mb-2 mt-6 rounded-xl bg-blue-500 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700"
          type="submit"
        >
          Edit
        </button>
      </Link>
    </div>
  );
};

export default workoutStats;
