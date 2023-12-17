"use client";
import React, { useEffect, useState } from "react";
import GetCookie from "../utils/getCookie";
const Token = GetCookie("token") || "";
import LineChart from "./Chart";
import { workerData } from "worker_threads";

const ChartData = () => {
  //api data
  const [programs, setPrograms] = useState<any>([]);
  const [workout, setWorkout] = useState<any>([]);
  //logged workout data analysis
  const [numberOfWeeks, setNumberOfWeeks] = useState<number[]>([]);
  const [loadsForWeek, setLoadsForWeek] = useState<string[][]>([]);
  const [totalLoadPerWeek, setTotalLoadPerWeek] = useState<number[]>([]);
  const [setForWeek, setSetForWeek] = useState<string[][]>([]);
  const [totalSetPerWeek, setTotalSetPerWeek] = useState<number[]>([]);
  const [repsForWeek, setRepsForWeek] = useState<string[][]>([]);
  const [totalRepsPerWeek, setTotalRepsPerWeek] = useState<number[]>([]);
  //sum total of the created sets,loads,reps
  const [totalCreatedSet, setTotalCreatedSet] = useState<number>();
  const [totalCreatedLoads, setTotalCreatedLoads] = useState<number>();
  const [totalCreatedReps, setTotalCreatedReps] = useState<number>();

  //api call to retrieve the logged exercise data-----------------------------------------------------------
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
        setWorkout(data.workout);
      } catch (error) {
        console.error("Error fetching programs:", error);
      }
      //api call to retrieve the created program's data---------------------------------------------------------
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_FULL_DOMAIN}/api/programs/`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              authorization: Token,
            },
          },
        );
        const programData = await response.json();

        setPrograms(programData.programs);
      } catch (error) {
        console.error("Error fetching programs:", error);
      }
    };

    fetchPrograms();
  }, []);
  //calculate the total number of weeks from start date to program end date-----------------------------------
  useEffect(() => {
    const getWeeks = (startDate: string, endDate: string) => {
      const date1 = new Date(startDate);
      const date2 = new Date(endDate);

      // Calculate the difference in milliseconds
      const difference = Math.abs(date2.getTime() - date1.getTime());

      // Calculate the number of milliseconds in a day
      const oneDay = 24 * 60 * 60 * 1000;

      // Calculate the total days and weeks
      const totalDays = Math.round(difference / oneDay);
      const weeks = Math.floor(totalDays / 7);

      return { weeks };
    };

    const start = "2023-11-04";
    const updatedNumberOfWeeks: number[] = [];
    const loadsPerWeek: string[][] = [];
    const setsPerWeek: string[][] = [];
    const RepsPerWeek: string[][] = [];

    if (programs.length > 0) {
      const { date } = programs[0]; // Fetching the first date from the database
      const { weeks } = getWeeks(start, date);

      for (let i = 1; i < weeks + 1; i++) {
        let str = i.toString();
        updatedNumberOfWeeks.push(i);

        // Fetching data per week based on the first date
        const loadsForWeekOne = workout
          .flatMap((program: any) =>
            program.logged_workout.filter(
              (workoutData: any) => workoutData.week === str,
            ),
          )
          .map((workoutData: any) => workoutData.loads);

        loadsPerWeek.push(loadsForWeekOne);

        const setForWeek = workout
          .flatMap((program: any) =>
            program.logged_workout.filter(
              (workoutData: any) => workoutData.week === str,
            ),
          )
          .map((workoutData: any) => workoutData.sets);

        setsPerWeek.push(setForWeek);

        const repsForWeek = workout
          .flatMap((program: any) =>
            program.logged_workout.filter(
              (workoutData: any) => workoutData.week === str,
            ),
          )
          .map((workoutData: any) => workoutData.reps);

        RepsPerWeek.push(repsForWeek);
      }

      setLoadsForWeek(loadsPerWeek);
      setSetForWeek(setsPerWeek);
      setRepsForWeek(RepsPerWeek);
      setNumberOfWeeks(updatedNumberOfWeeks);
    }
  }, [programs, workout]);

  //calculate the total loads per week------------------------------------------------------------------------
  useEffect(() => {
    const calculateTotalLoads = () => {
      const totalLoads: number[] = [];

      loadsForWeek.forEach((loadsForSingleWeek: string[]) => {
        const sum = loadsForSingleWeek.reduce(
          (acc: number, load: string) => acc + parseInt(load, 10),
          0,
        );
        totalLoads.push(sum);
      });

      setTotalLoadPerWeek(totalLoads);
      console.log("loads" + totalLoadPerWeek);
    };

    calculateTotalLoads();
  }, [loadsForWeek]);
  //calculate the total loads per week------------------------------------------------------------------------
  useEffect(() => {
    const calculateTotalSets = () => {
      const totalSets: number[] = [];

      setForWeek.forEach((setsForSingleWeek: string[]) => {
        const sum = setsForSingleWeek.reduce(
          (acc: number, set: string) => acc + parseInt(set, 10),
          0,
        );
        totalSets.push(sum);
      });

      setTotalSetPerWeek(totalSets);
      console.log("sets" + totalSetPerWeek);
    };

    calculateTotalSets();
  }, [setForWeek]);
  //calculate the total loads per week------------------------------------------------------------------------
  useEffect(() => {
    const calculateTotalReps = () => {
      const totalReps: number[] = [];

      repsForWeek.forEach((repsForSingleWeek: string[]) => {
        const sum = repsForSingleWeek.reduce(
          (acc: number, reps: string) => acc + parseInt(reps, 10),
          0,
        );
        totalReps.push(sum);
      });

      setTotalRepsPerWeek(totalReps);
      console.log("reps" + totalRepsPerWeek);
    };

    calculateTotalReps();
  }, [repsForWeek]);
  //calculate total logged loads, sets, reps---------------------------------------------------------------------
  let totalLoggedLoads = 0;
  let totalLoggedSets = 0;
  let totalLoggedReps = 0;
  for (let i = 0; i < totalLoadPerWeek.length; i++) {
    totalLoggedLoads += totalLoadPerWeek[i];
  }
  for (let i = 0; i < totalSetPerWeek.length; i++) {
    totalLoggedSets += totalSetPerWeek[i];
  }
  for (let i = 0; i < totalRepsPerWeek.length; i++) {
    totalLoggedReps += totalRepsPerWeek[i];
  }
  console.log("totalLoggedLoads :" + totalLoggedLoads);
  console.log("totalLoggedSets :" + totalLoggedSets);
  console.log("totalLoggedReps :" + totalLoggedReps);

  //calculate the total sum of the created loads,sets, reps----------------------------------------------------------
  useEffect(() => {
    const repsArray: string[] = [];
    const setsArray: string[] = [];
    const loadArray: string[] = [];

    programs.forEach((program: any) => {
      program.workout.forEach((workoutData: any) => {
        repsArray.push(workoutData.reps);
        setsArray.push(workoutData.sets);
        loadArray.push(workoutData.load);
      });
    });

    // Convert strings in the arrays to numbers
    const convertedReps: number[] = repsArray.map((reps: string) =>
      parseInt(reps, 10),
    );
    const convertedSets: number[] = setsArray.map((sets: string) =>
      parseInt(sets, 10),
    );
    const convertedLoad: number[] = loadArray.map((load: string) =>
      parseInt(load, 10),
    );

    // Get the sum totals of the respective arrays
    const sumTotalReps: number = convertedReps.reduce(
      (acc: number, reps: number) => acc + reps,
      0,
    );
    const sumTotalSets: number = convertedSets.reduce(
      (acc: number, sets: number) => acc + sets,
      0,
    );
    const sumTotalLoad: number = convertedLoad.reduce(
      (acc: number, load: number) => acc + load,
      0,
    );
    const noDays = 4;
    const totalReps =
      sumTotalReps * sumTotalSets * noDays * numberOfWeeks.length;
    const totalLoad =
      sumTotalLoad * sumTotalSets * noDays * numberOfWeeks.length;
    const totalSet = sumTotalSets * noDays * numberOfWeeks.length;

    setTotalCreatedLoads(totalLoad);
    setTotalCreatedReps(totalReps);
    setTotalCreatedSet(totalSet);
    console.log("Sum of Reps:", sumTotalReps);
    console.log("Sum of Sets:", sumTotalSets);
    console.log("Sum of Load:", sumTotalLoad);
  }, [programs]);

  return (
    <LineChart
      numberOfWeeks={numberOfWeeks}
      totalLoadsPerWeek={totalLoadPerWeek}
      LoggedLoads={totalLoggedLoads}
      LoggedSets={totalLoggedSets}
      LoggedReps={totalLoggedReps}
      CreatedLoads={totalCreatedLoads}
      CreatedSets={totalCreatedSet}
      CreatedReps={totalCreatedReps}
    />
  );
};

export default ChartData;
