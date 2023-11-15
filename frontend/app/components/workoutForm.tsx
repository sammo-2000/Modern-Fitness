'use client'
import { FormEvent, useState} from "react";
// import { BrowserRouter} from 'react-router-dom'


 export const WorkoutForm = () =>{
    
 const[Type, SetType] = useState('')
 const[Load, SetLoad] = useState('')
 const[Reps, SetReps] = useState('')
 const [Date, SetDate] = useState('')
 const [error, setError] = useState(null)


 
    
 
   async function SubmitWorkoutForm(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const WorkoutJSON = {Type, Load, Reps, Date}
        console.log(JSON.stringify(WorkoutJSON))
         
        const APIresponse = await fetch('api/workouts', {
            method: 'POST',
            body:JSON.stringify(WorkoutJSON),
            headers: {
                'Content-Type': 'application/json'
              }
         })
         const responseJSON = APIresponse.json()
        
    }
    
 return (
  // https://v1.tailwindcss.com/components/forms
  <div className="w-full">

    <div className="bg-white text-xl flex items-center justify-center">
  <div className="container mx-auto max-w-screen-xl p-10 px-20 flex items-center justify-between color: #333;
  text-decoration: none;">
    <header className= 'text-5xl font-bold text-blue-700 flex items-center justify-center'>                        Tailored Workouts</header>
    </div>
    </div>
  <form onSubmit={SubmitWorkoutForm} className="Create bg-grey shadow-md rounded px-8 pt-6 pb-8 mb-4">
    
    <div className="mb-4">
      <label className="block text-gray-700 text-xl font-bold mb-2 " >
        Type of Exercise
      </label>
      <input className="shadow appearance-none border rounded w-full sm:w-1/2 md:w-1/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  type="text" onChange={(e) => SetType(e.target.value)} value = {Type} placeholder="Enter Workout Name">
      
      </input>    
    </div>
    <div className="mb-6">
      <label className="block text-gray-700 text-xl font-bold mb-2" >
        Load (in kg)
      </label>
      <input className="shadow appearance-none border rounded w-full sm:w-1/2 md:w-1/3 py-2 px-3 text-gray-900 mb-3 leading-tight focus:outline-none focus:shadow-outline"  type="number" onChange={(e) => SetLoad(e.target.value)}   value = {Load} placeholder="Enter the weight">
        </input>      
    </div>
    <div className="mb-6">
      <label className="block text-gray-700 text-xl font-bold mb-2" >
        Reps
      </label>
      <input className="shadow appearance-none border border-black-700 rounded w-full sm:w-1/2 md:w-1/3 py-2 px-3 text-gray-900 mb-3 leading-tight focus:outline-none focus:shadow-outline"  type="number"  onChange={(e) => SetReps(e.target.value)}value = {Reps} placeholder="Enter the number of reps ">
        </input>      
    </div>
    <div className="mb-6 flex items-center">
          <label className="block text-gray-700 text-sm font-bold mb-2 w-1/2">
            Goals
          </label>
          <textarea
            className="border rounded w-1/2 py-2 px-3 text-gray-900 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            rows={4}
            placeholder="Your goals..."
          />
        </div>
    <div className="flex items-center justify-between">
      {/* Button css from: https://flowbite.com/docs/components/buttons/ */}
      <button className ="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" type="button" >
        Add
      </button>
      {error && <div className="error">{error}</div>}
    </div>
  </form>

</div>
  
 )
}
export default WorkoutForm