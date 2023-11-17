"use client";
import React, { useState } from "react";
import Link from "next/link";
import Head from "next/head";
export default function Login() {
  const [SignInForm, setSignInForm] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    Password: "",
    isCheck: false,
  });
  const [errorMessage, setErrorMessage] = useState("");
  function handleChange(event: any) {
    const { name, value, type, checked } = event.target;
    setSignInForm((prevForm) => ({
      ...prevForm,
      [name]: type === "checkbox" ? checked : value,
    }));
  }
  function handleSubmission(event: any) {
    event.preventDefault();

    if (SignInForm.Email === "") {
      setErrorMessage("Enter your email address");
    } else if (SignInForm.Password === "") {
      setErrorMessage("Enter your Password");
    } else {
      console.log(SignInForm);
      setErrorMessage("");
    }
  }

  return (
    <div className=" flex h-screen items-center justify-center">
      <div className="  w-[550px] ">
        <h1 className=" mb-2 text-3xl font-semibold">Login</h1>
        <div className="mb-12">
          <p>
            Don&apos;t have an account? &nbsp;
            <Link href="registration" className="text-blue-500 hover:underline">
              Register
            </Link>
          </p>
        </div>
        <form onSubmit={handleSubmission}>
          <div className=" mb-12 ">
            <input
              id="email"
              type="email"
              onChange={handleChange}
              name="Email"
              placeholder="Email Address or Access Pin"
              className="mb-6 h-[65px] w-full rounded-xl border border-gray-300 p-3 focus:border-2 focus:border-blue-500 focus:outline-none"
            />

            <input
              id="password"
              type="password"
              onChange={handleChange}
              name="Password"
              placeholder="Password"
              className="h-[65px] w-full rounded-xl border border-gray-300 bg-blue-50 p-3 focus:border-2 focus:border-blue-500 focus:outline-none"
            />
            {errorMessage}
          </div>
          {/* { <p className="bg-gradient-to-r from-red-100 to-red-300 text-red-700 font-bold text-base  w-[500px] h-[55px] text-center rounded-xl pt-4">{errorMessage}</p>} */}
          <button
            type="submit"
            className="h-[65px] w-full rounded-lg bg-blue-500 p-3 text-white hover:bg-blue-600"
          >
            Continue
          </button>
        </form>
        <div className=" mt-10 text-center ">
          <Link
            href="/Auth/register"
            className=" text-sm font-bold text-blue-500 hover:underline"
          >
            Reset Password
          </Link>
        </div>
      </div>
    </div>
  );
}
