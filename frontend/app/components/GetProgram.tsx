"use client";
import React, { useEffect, useState } from "react";
import WorkoutStats from "../components/workoutStats";
import { useProgramContext } from "../hooks/useProgramContext";
import { useFetchedData } from "../context/MemberIdContext";
import GetCookie from "../utils/getCookie";
import type { Workout } from "../types/workout";
import type { Program } from "../types/program";

export const GetPrograms = ({ MemberId }: { MemberId: string }) => {
  // const { MemberId } = useFetchedData();
  const { programs, dispatch } = useProgramContext();
  const token = GetCookie("token") || "";

  useEffect(() => {
    const fetchPrograms = async () => {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_FULL_DOMAIN +
          "/api/programs/" +
          MemberId,
        {
          headers: {
            authorization: token,
          },
        },
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
    <div className="mx-4">
      {programs &&
        programs.map((program: Program) => (
          <div key={program._id} className="rounded-xl px-2 py-4 shadow">
            <h1 className="mb-2 flex items-center justify-center font-sans text-2xl font-bold">
              Program Ending On: {program.date}
            </h1>
            {program.workout.map((workout: Workout) => (
              <WorkoutStats key={workout._id} workout={workout} />
            ))}
          </div>
        ))}
    </div>
  );
};
export default GetPrograms;
