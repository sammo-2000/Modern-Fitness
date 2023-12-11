"use client";
import React from 'react'
import EditWorkoutForm from '@/app/components/EditProgram'
import { useProgramContext } from "@/app/hooks/useProgramContext";
import GetCookie from "@/app/utils/getCookie";
import { useFetchedData } from "@/app/context/MemberIdContext";
import type { Workout } from "@/app/types/workout";

export const EditWorkout = ({ params }: any) => {
  const MemberId = params.id;

  const { programs, dispatch } = useProgramContext();
  useEffect(() => {
    const token = GetCookie("token") || "";
    const fetchPrograms = async () => {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_FULL_DOMAIN +
          "/api/programs/:program_id" +
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

  console.log(params.id);
  return (
    <div className="w-full flex-1 p-3">
      <EditWorkoutForm user_id={MemberId} />
    </div>
  );
};

export default EditWorkout;
