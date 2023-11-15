"use client";
import React, { useState } from "react";
import Link from "next/link";
export default function SignUp() {
  const [SignUpForm, setSignUpForm] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    Password: "",
    isCheck: false,
  });
  const [errorMessage, setErrorMessage] = useState("");
  function handleChange(event: any) {
    const { name, value, type, checked } = event.target;
    setSignUpForm((prevForm) => ({
      ...prevForm,
      [name]: type === "checkbox" ? checked : value,
    }));
  }
  function handleSubmission(event: any) {
    event.preventDefault();

    if (!SignUpForm.FirstName) {
      setErrorMessage("Enter your firstname");
    } else if (SignUpForm.LastName === "") {
      setErrorMessage("Enter your lastname");
    } else if (SignUpForm.Email === "") {
      setErrorMessage("Enter your email address");
    } else if (SignUpForm.Password === "") {
      setErrorMessage("Enter your Password");
    } else if (SignUpForm.isCheck === false) {
      setErrorMessage("Please select checkbox");
    } else {
      console.log(SignUpForm);
      setErrorMessage("");
    }
  }

  return (
    <div className=" flex h-screen items-center justify-center">
      <div className=" w-[550px] p-3">
        <div className="mb-12">
          <h1 className="text-2xl font-bold">Register</h1>
          <p>
            Already have an account?{" "}
            <Link href="signIn" className="text-blue-500 hover:underline">
              Log in
            </Link>
          </p>
        </div>
        <form onSubmit={handleSubmission}>
          <div className="w-full ">
            <div className=" mb-12">
              <div className=" mb-6 flex ">
                <input
                  id="FirstName"
                  type="text"
                  onChange={handleChange}
                  name="FirstName"
                  placeholder="Firstname"
                  className="mr-2  h-[65px]  w-1/2 rounded-xl border  border-gray-300 p-2 focus:border-2 focus:border-blue-500 focus:outline-none"
                />
                <input
                  id="LastName"
                  type="text"
                  onChange={handleChange}
                  name="LastName"
                  placeholder="Lastname"
                  className=" h-[65px] w-1/2  rounded-xl border border-gray-300  p-2 focus:border-2 focus:border-blue-500 focus:outline-none "
                />
              </div>
              <input
                id="email"
                type="email"
                onChange={handleChange}
                name="Email"
                placeholder="Email"
                className="mb-6  h-[65px] w-full rounded-xl border border-gray-300 bg-blue-50 p-3 focus:border-2 focus:border-blue-500 focus:outline-none"
              />

              <input
                id="password"
                type="password"
                onChange={handleChange}
                name="Password"
                placeholder="Password"
                className="mb-6 h-[65px] w-full rounded-xl border border-gray-300 bg-blue-50 p-3 focus:border-2 focus:border-blue-500 focus:outline-none"
              />

              <input
                id="consent"
                type="checkbox"
                checked={SignUpForm.isCheck}
                name="isCheck"
                onChange={handleChange}
              />
              <label htmlFor="consent" className="ml-4 text-sm font-bold">
                {" "}
                I consent to sharing my information
              </label>
            </div>
            <button
              type="submit"
              className=" h-[65px] w-full rounded-lg bg-blue-500 p-3 text-white hover:bg-blue-600"
            >
              Continue
            </button>
            <p className=" text-red-500">{errorMessage}</p>
          </div>
        </form>
      </div>
    </div>
  );
}
