const DisplayPrograms = ({ programs }: { programs: any[] }) => {
  return (
    <div className="flex min-h-screen w-full flex-col gap-5">
      {programs.map((program: any) => {
        return <DisplaySingleProgram key={program._id} program={program} />;
      })}
    </div>
  );
};

const DisplaySingleProgram = ({ program }: { program: any }) => {
  return (
    <>
      <div className="m-4 flex flex-col gap-5 border-t-4 p-2">
        <p className=" mb-2 flex items-center justify-center font-sans text-2xl  font-bold">
          Program Ending On: {program.date}
        </p>
        <div className="flex flex-wrap gap-5">
          {program.workout.map((workout: any) => {
            return <DisplayWorkout key={workout._id} workout={workout} />;
          })}
        </div>
      </div>
    </>
  );
};

const DisplayWorkout = ({ workout }: { workout: any }) => {
  return (
    <>
      <div className="flex w-full min-w-[300px] flex-1 flex-col gap-1 rounded border p-2 shadow">
        <p>
          <strong>Name:</strong> {workout.name}
        </p>
        <p>
          <strong>Load:</strong> {workout.load}
        </p>
        <p>
          <strong>Reps:</strong> {workout.reps}
        </p>
        <p>
          <strong>Sets:</strong> {workout.sets}
        </p>
      </div>
    </>
  );
};

export default DisplayPrograms;
