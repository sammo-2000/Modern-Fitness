"use client";
import { useEffect, useState } from "react";
import GetCookie from "../utils/getCookie";
const Token = GetCookie("token") || "";
const UserId = GetCookie("id") || "";
interface ExerciseInfo {
  loads: string;
  reps: string;
  sets: string;
  exercise: string;
  week: string;
}

interface DataProps {
  id: {
    name: string;
  };
}

//const Data: React.FC<DataProps> = ({ id }) => {
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

    // try {
    //   // Check all fields are filled
    //   if (!week) return setError("Select a week");
    //   if (!exercise) return setError("Please enter exercise");
    //   if (!sets) return setError("Please enter number of sets");
    //   if (!reps) return setError("Please enter number of reps");
    //   if (!loads) return setError("Please enter number of loads");

    //   const user_id = "656613daba2ef7a693cc7997"; // Replace this with the actual user_id

    //   if (exerciseData.length > 0) {
    //     const WorkoutJSON = {
    //       user_id,
    //       logged_workout: exerciseData,
    //     };
    //     console.log(JSON.stringify(WorkoutJSON));
    //     console.log(exerciseData);

    //     // Fetch the user's existing data from the database
    //     const existingDataResponse = await fetch(
    //       `${process.env.NEXT_PUBLIC_BACKEND_FULL_DOMAIN}/api/exercise/`,
    //       {
    //         method: "GET",
    //         headers: {
    //           "Content-Type": "application/json",
    //           authorization: Token,
    //         },
    //       },
    //     );
    //     const existingData = await existingDataResponse.json();
    //     console.log(existingData.workout);
    //     // If no matching user_id found, simply add the logged_workout object
    //     if (!existingData) {
    //       const APIresponse = await fetch(
    //         `${process.env.NEXT_PUBLIC_BACKEND_FULL_DOMAIN}/api/exercise`,
    //         {
    //           method: "POST",
    //           body: JSON.stringify(WorkoutJSON),
    //           headers: {
    //             "Content-Type": "application/json",
    //             authorization: Token,
    //           },
    //         },
    //       );
    //       const responseJSON = await APIresponse.json();
    //       if (!responseJSON.success) {
    //         setError(responseJSON.message);
    //       } else {
    //         console.log("Workout has been added: ", responseJSON.exercise);
    //         setExerciseData([]);
    //         clearsForm();
    //       }
    //     } else {
    //       // If user_id found, update the exerciseData array in the existing data
    //       //   const updatedData = {
    //       //     ...existingData,
    //       //     logged_workout: [...existingData.logged_workout, ...exerciseData],
    //       //   };

    //       // Retrieve the existing logged_workout array and add the new object

    //       const updatedLoggedWorkout = [
    // data.workout.map((program: any) => {
    //     return program.logged_workout.map((workoutData: any) =>
    //       console.log(workoutData.loads),
    //     );
    //   });
    //         ...existingData.logged_workout,
    //         ...exerciseData,
    //       ];

    //       const updatedData = {
    //         ...existingData,
    //         logged_workout: updatedLoggedWorkout,
    //       };

    //       const APIresponse = await fetch(
    //         `${process.env.NEXT_PUBLIC_BACKEND_FULL_DOMAIN}/api/exercise/${user_id}`,
    //         {
    //           method: "PATCH",
    //           body: JSON.stringify(updatedData),
    //           headers: {
    //             "Content-Type": "application/json",
    //             authorization: Token,
    //           },
    //         },
    //       );
    //       const responseJSON = await APIresponse.json();
    //       if (!responseJSON.success) {
    //         setError(responseJSON.message);
    //       } else {
    //         setExerciseData([]);
    //         console.log("Workout has been updated: ", responseJSON.exercise);
    //       }
    //     }
    //   }
    // } catch (error) {
    //   console.log(error);
    // }

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
    const remainingDays = totalDays % 7;

    return { weeks, remainingDays };
  };

  const start = "2023-11-04";
  useEffect(() => {
    const updatedNumberOfWeeks: number[] = [];
    programs.forEach((program: any) => {
      const { date } = program;
      const { weeks, remainingDays } = getWeeks(start, date);

      for (let i = 1; i < weeks + 1; i++) {
        updatedNumberOfWeeks.push(i);
      }
      console.log(numberOfWeeks);
      console.log(
        `Program ID: ${program._id}, Total weeks: ${weeks}, Remaining days: ${remainingDays}`,
      );
    });
    setNumberOfWeeks(updatedNumberOfWeeks);
  }, [programs]);

  return (
    <div>
      <h1 className=" mb-16 text-center text-xl font-extrabold text-gray-700">
        Log Exercise
      </h1>
      <div className=" ">
        <div>
          <form onSubmit={handleSubmission}>
            <div className=" ">
              <div className=" mb-6  ">
                <select
                  name="week"
                  id="week"
                  onChange={handleChange}
                  value={week}
                  className="mb-6 w-full rounded-xl border border-gray-300 bg-blue-50 px-3 py-5 focus:border-2 focus:border-blue-500 focus:outline-none"
                >
                  <option value="" disabled hidden selected>
                    Select a week
                  </option>
                  {numberOfWeeks.map((w) => (
                    <option key={w} value={w}>
                      Week {w}
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
                  <option value="" disabled hidden selected>
                    Select Exercise
                  </option>
                  {programs.map((program: any) => {
                    return program.workout.map((workoutData: any) => (
                      <option key={workoutData.id} value={workoutData.name}>
                        {workoutData.name}
                      </option>
                    ));
                  })}
                </select>
                <input
                  id="sets"
                  type="number"
                  onChange={handleChange}
                  value={sets}
                  name="sets"
                  placeholder="Log Sets "
                  className="mb-4 w-1/2 rounded-xl border  border-gray-300 px-3 py-5 focus:border-2 focus:border-blue-500 focus:outline-none"
                />
                <input
                  id="reps"
                  type="number"
                  onChange={handleChange}
                  value={reps}
                  name="reps"
                  placeholder="Log Reps"
                  className="w-1/2 rounded-xl border border-gray-300  px-3 py-5 focus:border-2 focus:border-blue-500 focus:outline-none "
                />
                <input
                  id="loads"
                  type="number"
                  onChange={handleChange}
                  value={loads}
                  name="loads"
                  placeholder="Log Loads (kg)"
                  className="w-1/2 rounded-xl border border-gray-300  px-3 py-5 focus:border-2 focus:border-blue-500 focus:outline-none "
                />
              </div>
            </div>
            {error && (
              <div className="mb-6 rounded-lg bg-red-100 px-5 py-2 text-center font-bold text-red-600">
                {error}
              </div>
            )}
            {success && (
              <div className="mb-6 rounded-lg bg-green-100 px-5 py-2 text-center font-bold text-green-600 ">
                {success}
              </div>
            )}

            <button
              onClick={addsToList}
              className=" float-right rounded-lg bg-blue-500 px-6 py-2 font-bold text-white"
            >
              Add
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Data;
