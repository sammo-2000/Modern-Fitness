"use client";
import React, { useEffect } from "react";
import WorkoutForm from "@/app/components/workoutForm";
import WorkoutStats from "@/app/components/workoutStats";
import { useProgramContext } from "@/app/hooks/useProgramContext";
import GetCookie from "@/app/utils/getCookie";
import type { Workout } from "@/app/types/workout";

interface Params {
  MemberId: string;
  ProgramId: string;
}

export const WorkoutPage = ({ params }: { params: Params }) => {
  const memberId = params.MemberId;
  const programId = params.ProgramId;

  const { programs, dispatch } = useProgramContext();

  useEffect(() => {
    const token = GetCookie("token") || "";
    const fetchPrograms = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_FULL_DOMAIN}/api/program/${memberId}/${programId}`,
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
    <div className="w-full flex-1">
      <WorkoutForm user_id={memberId} />
      <div className="">
        {programs &&
          programs.map(
            (
              program: { workout: Workout[]; date: string },
              programIndex: number,
            ) =>
              program.workout &&
              program.workout.map((workout: Workout, workoutIndex: number) => (
                <WorkoutStats
                  key={`${program.date}-${programIndex}-${workout.id}-${workoutIndex}`}
                  workout={workout}
                />
              )),
          )}
      </div>
    </div>
  );
};

export default WorkoutPage;
