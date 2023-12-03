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

    //   if (MemberId) {
    //     fetchPrograms();
    //   }
    // }, [MemberId, dispatch]);
    fetchPrograms();
  }, []);
  // return (
  //   <div className="">
  //     {programs &&
  //       programs.map(
  //         (program: { workout: Workout[]; date: Date }, programIndex: number) =>
  //           program.workout &&
  //           program.workout.map((workout: Workout, workoutIndex: number) => (
  //             <WorkoutStats
  //               key={`${program.date}-${programIndex}-${workout.id}-${workoutIndex}`}
  //               date={program.date}
  //               workout={workout}
  //             />
  //           )),
  //       )}
  //   </div>
  // );
  return (
    <div className="">
      {programs &&
        programs.map((program: Program) => (
          <div key={program._id}>
            <h1>{program.date}</h1>
            {program.workout.map((workout: Workout) => (
              <WorkoutStats key={workout.id} workout={workout} />
            ))}
          </div>
        ))}
    </div>
  );
};
export default GetPrograms;
