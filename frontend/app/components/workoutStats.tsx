
import React from 'react';


interface Workout {
  name: string;
  load: number;
  reps: number;
}

const workoutStats: React.FC<{ workout: Workout, date:Date }> = ({ workout, date }) => {
  return (
    <div className='workout-Stats rounded-lg mx-20 my-20 p-20 relative shadow-md text-xl border border-black bg-white' >
      <h3 className='mb-4  text-green-700 text-3xl'  text-primary>{workout.name}</h3>
      <p className="m-0 text-xl text-gray-600"><strong>Load (kg): </strong>{workout.load}</p>
      <p className="m-0 text-xl text-gray-600"><strong>Number of reps: </strong>{workout.reps}</p>
      <p className="m-0 text-xl text-gray-600"><strong>End Date: </strong>{date.toString()}</p>
      <a className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 absolute bottom-0 right-0"
  href="#">
        Edit
      </a>
    </div>
  );
};

export default workoutStats;
