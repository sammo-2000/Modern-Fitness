"use client";
import React, { useState } from "react";
import Link from "next/link";
export default function Login() {
  const [userIdentifier, setUserIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (event: any) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    const { name, value } = event.target;
    if (name === "user_identifier") {
      setUserIdentifier(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmission = async (event: any) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    try {
      console.log("FIRST API CALL");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_FULL_DOMAIN}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ User_identifier: userIdentifier, password }),
        },
      );
      const data = await response.json();
      if (!data.success) return setError(data.message);

      // Set cookie on the server side, for extra security
      const cookiesResponse = await fetch(`/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: data.token, user: data.user }),
      });
      const cookiesData = await cookiesResponse.json();

      if (!cookiesData.success) return setError(cookiesData.message);

      setSuccess(data.message);
      window.location.replace("/");
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="mx-auto mb-11 max-w-[550px] p-3">
      <div className="mb-12">
        <h1 className="mb-2 text-3xl font-semibold">Login</h1>
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
            id="user_identifier"
            type="user_identifier"
            onChange={handleChange}
            name="user_identifier"
            placeholder="Email Address or Access Pin"
            className="mb-6 h-[65px] w-full rounded-xl border border-gray-300 p-3 focus:border-2 focus:border-blue-500 focus:outline-none"
          />

          <input
            id="password"
            type="password"
            onChange={handleChange}
            name="password"
            placeholder="Password"
            className="h-[65px] w-full rounded-xl border border-gray-300 bg-blue-50 p-3 focus:border-2 focus:border-blue-500 focus:outline-none"
          />
        </div>
        {error ? (
          <div className="mb-6 rounded-lg bg-red-100 px-5 py-2 text-red-600">
            {error}
          </div>
        ) : null}
        {success ? (
          <div className="mb-6 rounded-lg bg-green-100 px-5 py-2 text-green-600">
            {success}
          </div>
        ) : null}
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
  );
}
