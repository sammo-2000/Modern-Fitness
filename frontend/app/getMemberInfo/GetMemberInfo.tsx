"use client";
import React, { useState } from "react";

import GetCookie from "../utils/getCookie";
const Token = GetCookie("token") || "";

function GetMemberInfo() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [allergy, setAllergy] = useState("");
  const [goal, setGoal] = useState("");
  const [vegan, setVegan] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmission = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (!height) return setErrorMessage("Please input your height");
      if (!weight) return setErrorMessage("Please input your weight");
      if (!allergy)
        return setErrorMessage("Please make any food allergy known");
      if (!goal) return setErrorMessage("Please enter what your fitness goal");
      if (!vegan) return setErrorMessage("Please fill all fields");

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_FULL_DOMAIN}/api/user/`,
          {
            method: "PATCH",
            body: JSON.stringify({ height, weight, vegan, goal, allergy }),
            headers: {
              "Content-Type": "application/json",
              authorization: Token,
            },
          },
        );
        if (res.ok) {
          // Content successfully updated
          setErrorMessage(" Verification Successful");
          console.log("Verification Successful");
        } else {
          // Handle errors if needed
          setErrorMessage("Verification Failed");
          console.error("Verification Failed");
        }
      } catch (error) {
        console.error("Error:", error);
        setErrorMessage("Verification Failed");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Verification Failed");
    }
  };

  //Weight, Height, Vegan, Allergies, Goals
  return (
    <div>
      {" "}
      <form onSubmit={handleSubmission}>
        <div className="w-full ">
          <div className=" mb-12">
            <div className=" mb-6 flex ">
              <input
                id="height"
                type="number"
                onChange={(e) => setHeight(e.target.value)}
                name="height"
                placeholder="Height"
                className="mr-2 w-1/2 rounded-xl border  border-gray-300 px-3 py-5 focus:border-2 focus:border-blue-500 focus:outline-none"
              />
              <input
                id="weight"
                type="number"
                onChange={(e) => setWeight(e.target.value)}
                name="weight"
                placeholder="Weight"
                className="w-1/2 rounded-xl border border-gray-300  px-3 py-5 focus:border-2 focus:border-blue-500 focus:outline-none "
              />
            </div>
            <textarea
              id="allergy"
              onChange={(e) => setAllergy(e.target.value)}
              name="allergy"
              placeholder="State any Food Allergy you may have or type 'not applicable'"
              className="min-h-[400px]: mb-6 w-full rounded-xl border border-gray-500  px-3 py-5 focus:border-2 focus:border-blue-500 focus:outline-none"
            />
            <textarea
              id="goal"
              onChange={(e) => setGoal(e.target.value)}
              name="goal"
              placeholder="State your fitness goal"
              className="mb-6 w-full rounded-xl border border-gray-500  px-3 py-5 focus:border-2 focus:border-blue-500 focus:outline-none"
            />

            <label> Are you a vegan?</label>
            <input
              type="radio"
              id="true"
              value="Yes"
              checked={vegan === "true"}
              onChange={() => setVegan("true")}
              name="vegan"
            />
            <label htmlFor="false">Yes</label>
            <input
              type="radio"
              id="false"
              value="No"
              checked={vegan === "false"}
              onChange={() => setVegan("false")}
              name="vegan"
            />
            <label htmlFor="false">No</label>
          </div>
          {errorMessage && (
            <p
              className={`mb-6 rounded-lg px-5 py-2 ${
                errorMessage.includes("Failed")
                  ? "bg-red-100 text-red-600"
                  : "bg-green-100 text-green-600"
              }`}
            >
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            className=" float-right w-[180px] rounded-lg bg-blue-500 px-3 py-5 text-white hover:bg-blue-600"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}

export default GetMemberInfo;
