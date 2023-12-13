"use client";
import { useEffect, useState } from "react";
import GetCookie from "../utils/getCookie";
const Token = GetCookie("token") || "";

const displayProgram = () => {
  const [programs, setPrograms] = useState([]);
  useEffect(() => {
    const fetchProgram = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_FULL_DOMAIN}/api/programs/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: Token,
          },
        },
      );
      const data = await response.json();
      setPrograms(data.programs);
    };

    fetchProgram();
  }, []);

  if (programs && programs.length !== 0)
    return <DisplayPrograms programs={programs} />;
  else return <NotFound />;
};

const NotFound = () => {
  return (
    <>
      <h1 className="mb-4 text-2xl uppercase text-gray-400">
        Sorry, no custom program found
      </h1>
      <p className="uppercase text-gray-400">
        Please wait until one of our trainer create one for you
      </p>
    </>
  );
};

const DisplayPrograms = ({ programs }: { programs: any[] }) => {
  return (
    <div className="flex min-h-screen w-full flex-col gap-5">
      {programs.map((program: any) => {
        return <DisplaySingleProgram program={program} />;
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
            return <DisplayWorkout workout={workout} />;
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

export default displayProgram;
