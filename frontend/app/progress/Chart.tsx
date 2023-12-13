"use client";
import { useEffect, useState } from "react";
import GetCookie from "../utils/getCookie";
const Token = GetCookie("token") || "";

import React from "react";

const Chart = () => {
  const [loadsForWeekOne, setLoadsForWeekOne] = useState([]);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_FULL_DOMAIN}/api/exercise/`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              authorization: Token,
            },
          },
        );
        const data = await response.json();

        // Filter 'loads' where 'week' equals '1'
        const loadsForWeekOne = data.workout
          .flatMap((program: any) =>
            program.logged_workout.filter(
              (workoutData: any) => workoutData.week === "2",
            ),
          )
          .map((workoutData: any) => workoutData.loads);

        console.log(loadsForWeekOne); // Display 'loads' for week 1

        setLoadsForWeekOne(loadsForWeekOne);
      } catch (error) {
        console.error("Error fetching programs:", error);
      }
    };

    fetchPrograms();
  }, []);

  return <div>Chart</div>;
};

export default Chart;
