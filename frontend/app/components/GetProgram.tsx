"use client";
import React, { useEffect, useState } from "react";
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

export const GetPrograms = () => {
    const { MemberId } = useFetchedData();
  
    const { programs, dispatch } = useProgramContext();
  
    useEffect(() => {
      const fetchPrograms = async () => {
        const response = await fetch(
          process.env.NEXT_PUBLIC_BACKEND_FULL_DOMAIN + "/api/programs/" + MemberId,
        );
  
        const json = await response.json();
  
        if (response.ok) {
          console.log(json);
          dispatch({ type: "SET_PROGRAM", payload: json.programs });
        }
      };
  
    //   if (MemberId) {
    //     fetchPrograms();
    //   }
    // }, [MemberId, dispatch]);
    fetchPrograms();
  }, []);
    return(
        <div className="">
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
    )
}
export default GetPrograms;