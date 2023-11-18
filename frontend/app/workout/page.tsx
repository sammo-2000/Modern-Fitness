"use client"
import React, { useEffect, useState } from 'react'
import WorkoutForm from '../components/workoutForm';
import WorkoutStats from '../components/workoutStats';
interface Workout {
  name: string;
  load: number;
  reps: number;
  id: number;
}
interface Program {
  workout: Workout[];
  date:Date;
 
}
interface ProgramAPIResponse {
  programs: Program[];
 
}

interface WorkoutStatsProps {
  workout: Workout;
}

export const WorkoutPage = ({user_id}: {user_id:any}) => {
  // this needs to be removed once pages are integrated
  user_id = "654d1b038077914a27529f0a"
  const [ProgramResponse, SetProgramResponse ]  = useState<ProgramAPIResponse |null >(null)
  useEffect(() => {
    const fetchPrograms = async () => {
      const response = await fetch('http://localhost:3001/api/programs/' + user_id)

      const json = await response.json()

      if (response.ok) {
        console.log(json)
        SetProgramResponse(json)
      }
    }

    fetchPrograms()
  }, [])

  return (
    <div className= "  bg-gray-300 min-h-screen">
       <WorkoutForm user_id={user_id} />
       <div className= "min-h-screen bg-gray-300">
      
       {ProgramResponse && ProgramResponse.programs.map(program => (
  program.workout && program.workout.map(workout => (
    <WorkoutStats key={workout.id} date = {program.date} workout={workout} />
  ))
))}
        
      </div>
     
    </div>
  )
}
// workout={workout}/>
export default WorkoutPage