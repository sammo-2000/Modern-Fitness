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
const Token = GetCookie("token") || "";

export const WorkoutForm = ({ user_id }: { user_id: any }) => {
  // const router = useRouter();
  const { dispatch } = useProgramContext();

  console.log("user_id", user_id);

  const [Name, SetName] = useState("");
  const [Load, SetLoad] = useState("");
  const [Reps, SetReps] = useState("");
  const [Sets, SetSets] = useState("");
  const [DateTime, SetDate] = useState(new Date());
  const [error, setError] = useState(null);
  const [workoutsList, setWorkoutsList] = useState<Workout[]>([]);

  const clearsForm = () => {
    SetName("");
    SetLoad("");
    SetReps("");
    SetSets("");
    SetDate(new Date());
  };
  const clearWorkoutForm = () => {
    SetName("");
    SetLoad("");
    SetReps("");
    SetSets("");
  };
  const addsToList = () => {
    const workout: Workout = {
      name: Name,
      load: Load,
      reps: Reps,
      sets: Sets,
    };
    setWorkoutsList((prevList) => [...prevList, workout]);

    clearWorkoutForm();
  };
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
      const WorkoutJSON = {
        user_id: user_id,
        workout: workoutsList,
        date: DateTime.toISOString().split("T")[0],
        //add workout start date
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
          <label
            htmlFor="name"
            className="mb-2 block text-xl font-semibold text-gray-700"
          >
            Type of Exercise
          </label>
          <input
            className="mb-3 w-full rounded-xl border border-gray-300 px-1 py-3 focus:border-2 focus:border-blue-500 focus:outline-none"
            type="text"
            onChange={(e) => SetName(e.target.value)}
            value={Name}
            placeholder="Enter Workout Name"
            id="name"
            name="name"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="load"
            className="mb-2 block text-xl font-bold text-gray-700"
          >
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
          <label
            htmlFor="reps"
            className="mb-2 block text-xl font-bold text-gray-700"
          >
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
          <label
            htmlFor="sets"
            className="mb-2 block text-xl font-bold text-gray-700"
          >
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
        <div className="mb-4">
          <label
            htmlFor="date"
            className="mb-2 block text-xl font-bold text-gray-700"
          >
            Select End Date
          </label>
          <Datepicker
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
        {error && <div className="text-red-600">{error}</div>}
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
