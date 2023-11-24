"use client";
import { FormEvent, useState } from "react";
import { Datepicker } from "flowbite-react";
import { useProgramContext } from "../hooks/useProgramContext";
interface Workout {
  name: string;
  load: string;
  reps: string;
}

export const WorkoutForm = ({ user_id }: { user_id: any }) => {
  const { dispatch } = useProgramContext();

  const [Name, SetName] = useState("");
  const [Load, SetLoad] = useState("");
  const [Reps, SetReps] = useState("");
  const [DateTime, SetDate] = useState(new Date());
  const [error, setError] = useState(null);
  const [workoutsList, setWorkoutsList] = useState<Workout[]>([]);

  const clearsForm = () => {
    SetName("");
    SetLoad("");
    SetReps("");
    SetDate(new Date());
  };
  const clearWorkoutForm = () => {
    SetName("");
    SetLoad("");
    SetReps("");
  };
  const addsToList = () => {
    const workout: Workout = {
      name: Name,
      load: Load,
      reps: Reps,
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
      };
      console.log(JSON.stringify(WorkoutJSON));
      const APIresponse = await fetch("http://localhost:4000/api/program", {
        method: "POST",
        body: JSON.stringify(WorkoutJSON),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseJSON = await APIresponse.json();
      if (!responseJSON.success) {
        setError(responseJSON.message);
      } else {
        clearsForm();
        setWorkoutsList([]);
        console.log("Workout has been added: ", responseJSON.program);
        dispatch({ type: "CREATE_PROGRAM", payload: responseJSON.program });
      }
    }
  };

  return (
    // https://v1.tailwindcss.com/components/forms
    <div className="w-full">
      <div className="flex items-center justify-center bg-white text-xl">
        <div
          className="color: #333; text-decoration: none; container mx-auto flex max-w-screen-xl items-center justify-between
  p-10 px-20"
        >
          <header className="flex items-center justify-center text-5xl font-bold text-blue-700">
            {" "}
            Tailored Programs
          </header>
        </div>
      </div>
      <form
        onSubmit={SubmitWorkoutForm}
        className="Create bg-grey mb-4 rounded px-8 pb-8 pt-6 shadow-md"
      >
        <div className="mb-4">
          <label className="mb-2 block text-xl font-bold text-gray-700 ">
            Type of Exercise
          </label>
          <input
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none  md:w-1/2"
            type="text"
            onChange={(e) => SetName(e.target.value)}
            value={Name}
            placeholder="Enter Workout Name"
          ></input>
        </div>
        <div className="mb-6">
          <label className="mb-2 block text-xl font-bold text-gray-700">
            Load (in kg)
          </label>
          <input
            className="focus:shadow-outline mb-3 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-900 shadow focus:outline-none  md:w-1/2"
            type="number"
            onChange={(e) => SetLoad(e.target.value)}
            value={Load}
            placeholder="Enter the weight"
          ></input>
        </div>
        <div className="mb-6">
          <label className="mb-2 block text-xl font-bold text-gray-700">
            Reps
          </label>
          <input
            className="border-black-700 focus:shadow-outline mb-3 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-900 shadow focus:outline-none  md:w-1/2"
            type="number"
            onChange={(e) => SetReps(e.target.value)}
            value={Reps}
            placeholder="Enter the number of reps "
          ></input>
        </div>
        <div className="relative max-w-sm">
          <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
            <svg
              className="h-4 w-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
            </svg>
          </div>
          <Datepicker
            onSelectedDateChanged={(date) => {
              console.log(date);
              SetDate(date);
            }}
            autoHide={true}
            className=" block w-full rounded-lg border border-gray-300 p-2.5 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="Select End date"
          ></Datepicker>
        </div>
        <div className="mb-6 flex items-center">
          <textarea
            className="focus:shadow-outline mb-3 w-1/3 resize-none rounded border px-3 py-2 leading-tight text-gray-900 focus:outline-none sm:w-1/2"
            rows={10}
          />
        </div>
        {/* https://www.creative-tim.com/learning-lab/tailwind-starter-kit/documentation/css/buttons/small/filled */}
        {workoutsList.map((workout, index) => (
          <li key={index} className="mb-2">
            {`${workout.name} - ${workout.load}kg - ${workout.reps} reps `}
            <button
              type="button"
              className="mb-1 ml-2 mr-1 rounded bg-red-500 px-4 py-2 text-xs font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-md focus:outline-none active:bg-red-600 "
              onClick={(event) => deleteWorkout(index, event)}
            >
              Remove
            </button>
          </li>
        ))}
        <div className="flex items-center justify-between">
          {/* Button css from: https://flowbite.com/docs/components/buttons/ */}
          <button
            className="mb-2 me-2 rounded-lg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
            type="button"
            onClick={addsToList}
          >
            Add
          </button>
        </div>
        <div className="flex items-center justify-between">
          {/* Button css from: https://flowbite.com/docs/components/buttons/ */}
          <button
            className="mb-2 me-2 rounded-lg bg-gradient-to-r from-green-400 via-green-500 to-green-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800"
            type="submit"
          >
            Save
          </button>
          {error && <div className="dark:text-red-400">{error}</div>}
        </div>
      </form>
    </div>
  );
};
export default WorkoutForm;
