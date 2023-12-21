"use client";
import React, { useEffect, useState } from "react";
import GetCookie from "../utils/getCookie";
import DisplayPrograms from "./DisplayPrograms"; // Make sure to import the correct components

const Token = GetCookie("token") || "";

const DisplayProgram = () => {
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    const fetchProgram = async () => {
      try {
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
      } catch (error) {
        console.error("Error fetching programs:", error);
      }
    };

    fetchProgram();
  }, []);

  if (programs && programs.length !== 0) {
    return <DisplayPrograms programs={programs} />;
  } else {
    return <NotFound />;
  }
};

const NotFound = () => {
  return (
    <>
      <h1 className="mb-4 text-2xl uppercase text-gray-400">
        Sorry, no custom program found
      </h1>
      <p className="uppercase text-gray-400">
        Please wait until one of our trainers creates one for you
      </p>
    </>
  );
};

export default DisplayProgram;
