"use client";
import { FormEvent, useState } from "react";

export const WorkoutForm = () => {
  const [Type, SetType] = useState("");
  const [Load, SetLoad] = useState("");
  const [Reps, SetReps] = useState("");
  const [Date, SetDate] = useState("");
  const [error, setError] = useState(null);

  async function SubmitWorkoutForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const WorkoutJSON = { Type, Load, Reps, Date };
    console.log(JSON.stringify(WorkoutJSON));

    const APIresponse = await fetch("api/workouts", {
      method: "POST",
      body: JSON.stringify(WorkoutJSON),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseJSON = APIresponse.json();
  }

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
            Tailored Workouts
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
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none sm:w-1/2 md:w-1/3"
            type="text"
            onChange={(e) => SetType(e.target.value)}
            value={Type}
            placeholder="Enter Workout Name"
          ></input>
        </div>
        <div className="mb-6">
          <label className="mb-2 block text-xl font-bold text-gray-700">
            Load (in kg)
          </label>
          <input
            className="focus:shadow-outline mb-3 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-900 shadow focus:outline-none sm:w-1/2 md:w-1/3"
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
            className="border-black-700 focus:shadow-outline mb-3 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-900 shadow focus:outline-none sm:w-1/2 md:w-1/3"
            type="number"
            onChange={(e) => SetReps(e.target.value)}
            value={Reps}
            placeholder="Enter the number of reps "
          ></input>
        </div>
        <div className="mb-6 flex items-center">
          <label className="mb-2 block w-1/2 text-sm font-bold text-gray-700">
            Goals
          </label>
          <textarea
            className="focus:shadow-outline mb-3 w-1/2 rounded border px-3 py-2 leading-tight text-gray-900 focus:outline-none"
            rows={4}
            placeholder="Your goals..."
          />
        </div>
        <div className="flex items-center justify-between">
          {/* Button css from: https://flowbite.com/docs/components/buttons/ */}
          <button
            className="mb-2 me-2 rounded-lg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
            type="button"
          >
            Add
          </button>
          {error && <div className="error">{error}</div>}
        </div>
      </form>
    </div>
  );
};
export default WorkoutForm;
