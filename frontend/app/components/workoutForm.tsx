// Code Reference https://www.youtube.com/watch?v=tRmeik-IpUQ&list=PL4cUxeGkcC9iJ_KkrkBZWZRHVwnzLIoUE&index=10
"use client";
import { FormEvent, useState } from "react";
import { Datepicker } from "flowbite-react";
import { useProgramContext } from "../hooks/useProgramContext";
import Link from "next/link";
// import { useRouter } from "next/router";
interface Workout {
  name: string;
  load: string;
  reps: string;
  sets: string;
}

import GetCookie from "../utils/getCookie";
import Notify from "./Notify";
const Token = GetCookie("token") || "";

export const WorkoutForm = ({ user_id }: { user_id: any }) => {
  // const router = useRouter();
  const { dispatch } = useProgramContext();

  console.log("user_id", user_id);
  {
    /* https://stackoverflow.com/questions/57491815/how-to-reset-select-dropdown-values-in-react/57491948#57491948 */
  }
  const defaultValue: string = "Please Select Workout Type";
  const [Name, SetName] = useState(defaultValue);
  const [Load, SetLoad] = useState("");
  const [Reps, SetReps] = useState("");
  const [Sets, SetSets] = useState("");
  const [DateTime, SetDate] = useState(new Date());

  const [error, setError] = useState<string>("");
  const [isSaveDisabled, SetSaveDisabled] = useState(true);

  const [workoutsList, setWorkoutsList] = useState<Workout[]>([]);

  const clearsForm = () => {
    clearWorkoutForm();
    SetDate(new Date());
  };
  const clearWorkoutForm = () => {
    SetName(defaultValue);
    SetLoad("");
    SetReps("");
    SetSets("");
    setError("");
  };
  const addsToList = () => {
    if (Name === "") {
      return setError("Workout name is required");
    }
    if (Load === "") {
      return setError("Workout load is required");
    }
    const loadInt = parseInt(Load, 10);
    if (Number.isNaN(loadInt)) {
      return setError("Workout load must be a number");
    }
    if (loadInt <= 0) {
      return setError("Workout load must be greater than 0");
    }
    if (Reps === "") {
      return setError("Workout reps is required");
    }
    const repsInt = parseInt(Reps, 10);
    if (Number.isNaN(repsInt)) {
      return setError("Workout reps must be a number");
    }
    if (repsInt <= 0) {
      return setError("Workout reps must be greater than 0");
    }
    if (Sets === "") {
      return setError("Workout sets is required");
    }
    const setsInt = parseInt(Sets, 10);
    if (Number.isNaN(setsInt)) {
      return setError("Workout sets must be a number");
    }
    if (setsInt <= 0) {
      return setError("Workout sets must be greater than 0");
    }
    const workout: Workout = {
      name: Name,
      load: Load,
      reps: Reps,
      sets: Sets,
    };
    setWorkoutsList((prevList) => [...prevList, workout]);

    clearWorkoutForm();
    SetSaveDisabled(false);
  };

  // https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/forms_and_events/
  const deleteWorkout = (
    index: number,
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.stopPropagation();

    const updatingList = [...workoutsList];
    updatingList.splice(index, 1);
    setWorkoutsList(updatingList);
  };
  const SubmitWorkoutForm = async (event: FormEvent<HTMLFormElement>) => {
    console.log("saving form");
    event.preventDefault();

    if (workoutsList.length > 0) {
      if (DateTime < new Date()) {
        return setError("End date must be in the future");
      }
      const WorkoutJSON = {
        user_id: user_id,
        workout: workoutsList,
        date: DateTime.toISOString().split("T")[0],
      };
      console.log(JSON.stringify(WorkoutJSON));
      const APIresponse = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_FULL_DOMAIN + "/api/program",
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
        clearsForm();
        setWorkoutsList([]);
        console.log("Workout has been added: ", responseJSON.program);
        dispatch({ type: "CREATE_PROGRAM", payload: responseJSON.program });

        // router.push("");
        document.location.replace(`/members/${user_id}`);
      }
    } else {
      setError("No workouts have been added");
    }
  };

  return (
    // https://v1.tailwindcss.com/components/forms
    <>
      <h1 className="text-3xl font-bold">Create Program</h1>
      <form
        onSubmit={SubmitWorkoutForm}
        className="Create bg-grey mb-4 rounded px-8 pb-8 pt-6 shadow"
      >
        <div className="mb-4">
          <label htmlFor="date" className="mb-2 block text-xl font-bold">
            Select End Date
          </label>
          <Datepicker
            minDate={new Date()}
            onSelectedDateChanged={(date) => {
              console.log(date);
              SetDate(date);
            }}
            autoHide={true}
            className="mb-3 w-full rounded-xl border border-gray-300 px-1 py-3 focus:border-2 focus:border-blue-500 focus:outline-none"
            placeholder="Select End date"
            id="date"
            name="date"
          />
        </div>
        <div className="mb-4">
          {/* https://jsfiddle.net/kb3gN/10396/ */}
          <label htmlFor="name" className="mb-2 block text-xl font-bold">
            Workout Type
          </label>
          <select
            value={Name}
            className="mb-3 w-full rounded-xl border border-gray-300 px-1 py-3 focus:border-2 focus:border-blue-500 focus:outline-none"
            onChange={(e) => SetName(e.target.value)}
            id="name"
            name="name"
          >
            <option value={defaultValue}>
              Please Enter the Type of workout
            </option>
            <option value="Bicep Curl">Bicep Curl</option>
            <option value="Tricep Curl">Tricep Curl</option>
            <option value="Pushup">Pushup</option>
            <option value="Lat Pull Down">Lat Pull Down</option>
            <option value="Bench Press">Bench Press</option>
            <option value="Leg Extensions">Leg Extensions</option>
            <option value="Leg Press">Leg Press</option>
            <option value="Pull Ups">Pull Ups</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="load" className="mb-2 block text-xl font-bold">
            Load (in kg)
          </label>
          <input
            className="mb-3 w-full rounded-xl border border-gray-300 px-1 py-3 focus:border-2 focus:border-blue-500 focus:outline-none"
            type="number"
            onChange={(e) => SetLoad(e.target.value)}
            value={Load}
            placeholder="Enter the weight"
            id="load"
            name="load"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="reps" className="mb-2 block text-xl font-bold">
            Reps
          </label>
          <input
            className="mb-3 w-full rounded-xl border border-gray-300 px-1 py-3 focus:border-2 focus:border-blue-500 focus:outline-none"
            type="number"
            onChange={(e) => SetReps(e.target.value)}
            value={Reps}
            placeholder="Enter the number of reps"
            id="reps"
            name="reps"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="sets" className="mb-2 block text-xl font-bold">
            Sets
          </label>
          <input
            className="mb-3 w-full rounded-xl border border-gray-300 px-1 py-3 focus:border-2 focus:border-blue-500 focus:outline-none"
            type="number"
            onChange={(e) => SetSets(e.target.value)}
            value={Sets}
            placeholder="Enter the number of sets"
            id="sets"
            name="sets"
          />
        </div>

        <div className="mb-4 flex flex-col justify-between sm:flex-row">
          <button
            className="mb-2 mt-6 rounded-xl border border-blue-500 bg-white px-4 py-2 text-sm font-bold text-blue-500 hover:bg-gray-100"
            type="button"
            onClick={addsToList}
          >
            Add Workout
          </button>
          <button
            className="mb-2 mt-6 rounded-xl bg-blue-500 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700"
            type="submit"
          >
            Save Program
          </button>
        </div>
        {error && (
          <div className="mb-4">
            <Notify message={error} />
          </div>
        )}
        {/* https://www.creative-tim.com/learning-lab/tailwind-starter-kit/documentation/css/buttons/small/filled */}
        {workoutsList.map((workout, index) => (
          <li
            key={index}
            className="mb-2 flex list-none justify-between rounded px-4 py-2 shadow"
          >
            <h2 className="self-start text-lg font-semibold">
              {`${workout.name} - ${workout.load}kg - ${workout.reps} reps ${workout.sets} sets `}
            </h2>
            <button
              type="button"
              className="self-end rounded-xl bg-red-500 px-4 py-2 text-sm font-bold text-white hover:bg-red-700"
              onClick={(event) => deleteWorkout(index, event)}
            >
              Remove
            </button>
          </li>
        ))}
      </form>
    </>
  );
};
export default WorkoutForm;
