
import React from 'react';


interface Workout {
  name: string;
  load: number;
  reps: number;
}

const workoutStats: React.FC<{ workout: Workout, date:Date }> = ({ workout, date }) => {
  return (
    <div className='workout-Stats rounded-lg mx-20 my-20 p-20 relative shadow-md text-xl border border-black bg-white' >
      <h1 className='mb-4  text-green-700 text-3xl'  text-primary = "true">{workout.name}</h1>
      <p className="m-0 text-xl text-gray-600">Load (kg): {workout.load}</p>
      <p className="m-0 text-xl text-gray-600">Number of reps: {workout.reps}</p>
      <p className="m-0 text-xl text-gray-600">End Date: {date.toString()}</p>
      
    </div>
  );
};

export default workoutStats;
