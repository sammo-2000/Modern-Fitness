"use client";
import React, { useEffect, useState } from "react";
import WorkoutForm from "../components/workoutForm";
import WorkoutStats from "../components/workoutStats";
import { useProgramContext } from "../hooks/useProgramContext";
import { useFetchedData } from "../context/MemberIdContext";
interface Workout {
  name: string;
  load: number;
  reps: number;
  id: number;
}
interface Program {
  workout: Workout[];
  date: Date;
}
interface ProgramAPIResponse {
  programs: Program[];
}

interface WorkoutStatsProps {
  workout: Workout;
}

export const WorkoutPage = ({ user_id }: { user_id: any }) => {
  const { MemberId } = useFetchedData();

  const { programs, dispatch } = useProgramContext();

  useEffect(() => {
    const fetchPrograms = async () => {
      const response = await fetch(
        "http://localhost:4000/api/programs/" + MemberId,
      );

      const json = await response.json();

      if (response.ok) {
        console.log(json);
        dispatch({ type: "SET_PROGRAM", payload: json.programs });
      }
    };

    fetchPrograms();
  }, []);

  return (
    <div className="  min-h-screen bg-gray-300">
      <WorkoutForm user_id={MemberId} />
      <div className="min-h-screen bg-gray-300">
        {programs &&
          programs.map(
            (
              program: { workout: Workout[]; date: Date },
              programIndex: number,
            ) =>
              program.workout &&
              program.workout.map((workout: Workout, workoutIndex: number) => (
                <WorkoutStats
                  key={`${program.date}-${programIndex}-${workout.id}-${workoutIndex}`}
                  date={program.date}
                  workout={workout}
                />
              )),
          )}
      </div>
    </div>
  );
};
// workout={workout}/>
export default WorkoutPage;
