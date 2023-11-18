"use client";
import { FormEvent, useState } from "react";
import { Datepicker } from 'flowbite-react';

export const WorkoutForm = ({user_id}: {user_id:any}) => {
  const [Name, SetName] = useState("");
  const [Load, SetLoad] = useState("");
  const [Reps, SetReps] = useState("");
  const [DateTime, SetDate] = useState(new Date());
  const [error, setError] = useState(null);

  const SubmitWorkoutForm = async (event: FormEvent<HTMLFormElement>)=>   {
    console.log("saving form")
    event.preventDefault();
    // const WorkoutJSON = { Type, Load, Reps, Date };
    
    
    const WorkoutJSON = 
    { 
      user_id: user_id, 
      workout: [{name:Name, load:Load, reps:Reps }],
      date: DateTime.toISOString().split('T')[0]

    }
    console.log(JSON.stringify(WorkoutJSON));
    const APIresponse = await fetch("http://localhost:3001/api/program", {
      method: "POST",
      body: JSON.stringify(WorkoutJSON),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseJSON = await APIresponse.json();
    if (!responseJSON.success) {
      setError(responseJSON.message)
    }
    else{
      setError(null)
      SetName("")
      SetLoad("")
      SetReps("")
      SetDate(new Date())
      console.log("Workout has been added: ", responseJSON.program)
    }

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
        <div className="relative max-w-sm">
  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
     <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
      </svg>
  </div>
  < Datepicker onSelectedDateChanged={(date) =>  SetDate(date)} autoHide= {true} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select End date">
    </Datepicker>
</div>
        <div className="mb-6 flex items-center">
          <label className="mb-2 block w-1/2 text-sm font-bold text-gray-700">
            Goals
          </label>
          <textarea
            className="focus:shadow-outline mb-3 w-1/2 rounded border px-3 py-2 leading-tight text-gray-900 focus:outline-none"
            rows={6}
           
          />
        </div>
        <div className="flex items-center justify-between">
          {/* Button css from: https://flowbite.com/docs/components/buttons/ */}
          <button
            className="mb-2 me-2 rounded-lg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
            type="submit"
          >
            Add
          </button>
          {error && <div className="dark:text-red-400">{error}</div>}
        </div>
      </form>
    </div>
  );
};
export default WorkoutForm;
