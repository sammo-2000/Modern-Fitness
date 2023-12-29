"use client";
import { useEffect, useState } from "react";
import GetCookie from "../utils/getCookie";
import Notify from "../components/Notify";
const Token = GetCookie("token") || "";
const UserId = GetCookie("id") || "";
interface ExerciseInfo {
  loads: string;
  reps: string;
  sets: string;
  exercise: string;
  week: string;
}

interface WeekInfo {
  weekNumber: number;
  startDate: string;
  endDate: string;
}

const Data = () => {
  const [programs, setPrograms] = useState<any>([]);
  const [week, setWeek] = useState("");
  const [reps, setReps] = useState("");
  const [sets, setSets] = useState("");
  const [loads, setLoads] = useState("");
  const [exercise, setExercise] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [numberOfWeeks, setNumberOfWeeks] = useState<number[]>([]);
  const [exerciseData, setExerciseData] = useState<ExerciseInfo[]>([]);
  const [weekData, setWeekData] = useState<WeekInfo[]>([]);

  const clearsForm = () => {
    setExercise("");
    setLoads("");
    setReps("");
    setSets("");
    setWeek("");
  };

  const addsToList = () => {
    const logged_workout: ExerciseInfo = {
      week: week,
      exercise: exercise,
      loads: loads,
      reps: reps,
      sets: sets,
    };
    setExerciseData((prevList) => [...prevList, logged_workout]);
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    switch (name) {
      case "week":
        setWeek(value);
        break;
      case "reps":
        setReps(value);
        break;
      case "sets":
        setSets(value);
        break;
      case "loads":
        setLoads(value);
        break;
      case "exercise":
        setExercise(value);
        break;
    }
    console.log("week: " + week);
  };
  //fetching workout data
  useEffect(() => {
    const fetchPrograms = async () => {
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
        const data = await response.json();

        setPrograms(data.programs);
      } catch (error) {
        console.error("Error fetching programs:", error);
      }
    };

    fetchPrograms();
  }, []);
  const handleSubmission = async (event: any) => {
    event.preventDefault();
    setError("");

    try {
      // Check all fields are filled
      if (!week) return setError("select a week");
      if (!exercise) return setError("Please enter exercise");
      if (!sets) return setError("Please enter number of sets");
      if (!reps) return setError("Please enter number of reps");
      if (!loads) return setError("Please enter number of loads");
      try {
        if (exerciseData.length > 0) {
          const WorkoutJSON = {
            logged_workout: exerciseData,
          };
          console.log(JSON.stringify(WorkoutJSON));
          console.log(exerciseData);

          const APIresponse = await fetch(
            process.env.NEXT_PUBLIC_BACKEND_FULL_DOMAIN + "/api/exercise",
            {
              method: "POST",
              body: JSON.stringify(WorkoutJSON),
              headers: {
                "Content-Type": "application/json",
                authorization: Token,
              },
            },
          );
          const responseJSON = await APIresponse.json();
          if (!responseJSON.success) {
            setError(responseJSON.message);
          } else {
            setSuccess("workout successfully logged");
            setExerciseData([]);
            clearsForm();
            console.log("Workout has been added: ", responseJSON.exercise);
          }
        }
      } catch (error: any) {
        console.log(error);
      }
    } catch (error: any) {
      console.log(error);
    }
  };
  const getWeeks = (startDate: string, endDate: string): WeekInfo[] => {
    const date1 = new Date(startDate);
    const date2 = new Date(endDate);

    // Calculate the difference in milliseconds
    const difference = Math.abs(date2.getTime() - date1.getTime());

    // Calculate the number of milliseconds in a day
    const oneDay = 24 * 60 * 60 * 1000;

    // Calculate the total days
    const totalDays = Math.round(difference / oneDay);

    let currentDate = new Date(startDate);

    const weeksArray: any = [];
    // Calculate weeks and their start and end dates
    for (let i = 0; i < Math.ceil(totalDays / 7); i++) {
      const startOfWeek = new Date(currentDate);
      const endOfWeek = new Date(
        currentDate.setDate(currentDate.getDate() + 6),
      );

      weeksArray.push({
        weekNumber: i + 1,
        startDate: startOfWeek.toISOString().split("T")[0],
        endDate: endOfWeek.toISOString().split("T")[0],
      });

      currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
    }

    return weeksArray;
  };

  const start = "2023-11-04";

  useEffect(() => {
    if (programs && programs.length > 0) {
      const { date } = programs[0]; // Fetching the first date from the database

      const weeksData = getWeeks(start, date);
      setWeekData([...weeksData]);
      console.log("Set weeks data:", weekData);
      weekData.forEach((week: WeekInfo) => {
        console.log("Week Number:", week.weekNumber);
      });
    }
  }, [programs]);
  return (
    <div className="w-full p-5">
      <h1 className=" mb-16 text-center text-xl font-extrabold ">
        Log Exercise
      </h1>
      <div className=" ">
        <form onSubmit={handleSubmission}>
          <div className="mb-6">
            <select
              name="week"
              id="week"
              onChange={handleChange}
              value={week}
              className="mb-6 w-full rounded-xl border border-gray-300 bg-blue-50 px-3 py-5 focus:border-2 focus:border-blue-500 focus:outline-none"
            >
              <option value="" disabled hidden>
                Select a week
              </option>
              {weekData.map((week: WeekInfo) => (
                <option key={week.weekNumber} value={week.weekNumber}>
                  Week {week.weekNumber} from {week.startDate} to {week.endDate}
                </option>
              ))}
            </select>
            <select
              name="exercise"
              id="exercise"
              onChange={handleChange}
              value={exercise}
              className="mb-6 w-full rounded-xl border border-gray-300 bg-blue-50 px-3 py-5 focus:border-2 focus:border-blue-500 focus:outline-none"
            >
              <option value="" disabled hidden>
                Select Exercise
              </option>
              {programs &&
                programs.map((program: any) => {
                  return program.workout.map((workoutData: any) => (
                    <option key={workoutData._id} value={workoutData.name}>
                      {workoutData.name}
                    </option>
                  ));
                })}
            </select>
            <div className="flex flex-wrap justify-end gap-4">
              <input
                id="sets"
                type="number"
                onChange={handleChange}
                value={sets}
                name="sets"
                placeholder="Log Sets "
                className="max-w-[10rem] rounded-xl border  border-gray-300 px-3 py-5 focus:border-2 focus:border-blue-500 focus:outline-none"
              />
              <input
                id="reps"
                type="number"
                onChange={handleChange}
                value={reps}
                name="reps"
                placeholder="Log Reps"
                className="max-w-[10rem] rounded-xl border border-gray-300  px-3 py-5 focus:border-2 focus:border-blue-500 focus:outline-none "
              />
              <input
                id="loads"
                type="number"
                onChange={handleChange}
                value={loads}
                name="loads"
                placeholder="Log Loads (kg)"
                className="max-w-[10rem] rounded-xl border border-gray-300  px-3 py-5 focus:border-2 focus:border-blue-500 focus:outline-none "
              />
            </div>
          </div>
          {error && <Notify type="error" message={error} />}
          {success && <Notify type="success" message={success} />}

          <button
            onClick={addsToList}
            className=" float-right rounded-lg bg-blue-500 px-6 py-2 font-bold text-white"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default Data;
