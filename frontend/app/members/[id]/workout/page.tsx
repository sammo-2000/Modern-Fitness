"use client";
import React, { useEffect, useState } from "react";
import WorkoutForm from "@/app/components/workoutForm";
import WorkoutStats from "@/app/components/workoutStats";
import { useProgramContext } from "@/app/hooks/useProgramContext";
import GetCookie from "@/app/utils/getCookie";
import { useFetchedData } from "@/app/context/MemberIdContext";
import type { Workout } from "@/app/types/workout";

export const WorkoutPage = ({ params }: any) => {
  const MemberId = params.id;

  const { programs, dispatch } = useProgramContext();

  
  console.log(params.id);
  return (
    <div className="w-full flex-1">
      <WorkoutForm user_id={MemberId} />
      
    </div>
  );
};

export default WorkoutPage;
