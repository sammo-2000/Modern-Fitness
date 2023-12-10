"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function SignUp() {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [checked, setChecked] = useState();

  const [error, setError] = useState("");
  const router = useRouter();

  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() - 18);
  const maxDateString = maxDate.toISOString().split("T")[0];

  const handleSubmission = async (event: any) => {
    event.preventDefault();
    setError("");

    try {
      // Check all fields are filled

      if (!first_name) return setError("Please enter your first name");
      if (!last_name) return setError("Please enter your last name");
      if (!email) return setError("Please enter your email");
      if (!password) return setError("Please enter your password");
      if (!dob) return setError("Please enter your date of birth");
      if (!gender) return setError("Please select gender");
      if (!checked)
        return setError("Please check the box of agreement to continue");
      if (dob > new Date().toISOString().split("T")[0])
        return setError("Date of birth cannot be in the future");
      if (dob > maxDateString) {
        return setError("You must be at least 18 years old to sign up");
      }

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_FULL_DOMAIN}/api/auth/signup`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              first_name,
              last_name,
              email,
              password,
              gender,
              dob,
            }),
          },
        );
        if (!response.ok) {
          const data = await response.json();
          setError(data.message);
        }
        // const data = await response.json();
        // console.log(data);

        // if (!data.success) {
        //   return setError(data.message);
        //}
        else {
          router.refresh();
          router.push("/");
        }

        // Set cookie on the server side, for extra security
        // const cookiesResponse = await fetch(`/api/login`, {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify({ token: data.token, user: data.user }),
        // });
        // const cookiesData = await cookiesResponse.json();

        // if (!cookiesData.success) return setError(cookiesData.message);

        // window.location.replace("/");
      } catch (error: any) {
        setError(error.message);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleChange = (event: any) => {
    setError("");

    const { name, value } = event.target;
    switch (name) {
      case "firstname":
        setFirstName(value);
        break;
      case "lastname":
        setLastName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "dob":
        setDob(value);
        break;
      case "gender":
        setGender(value);
        break;
      case "isCheck":
        setChecked(value);
        break;
    }

    console.log(`name: ${name}, value: ${value}`);
  };

  return (
    <div className="mx-auto mb-11 max-w-[550px] p-3">
      <div className="mb-12">
        <h1 className="mb-2 text-2xl font-bold">Register</h1>
        <p>
          Already have an account?{" "}
          <Link href="login" className="text-blue-500 hover:underline">
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
                name="firstname"
                placeholder="Firstname"
                className="mr-2 w-1/2 rounded-xl border  border-gray-300 px-3 py-5 focus:border-2 focus:border-blue-500 focus:outline-none"
                required
              />
              <input
                id="LastName"
                type="text"
                onChange={handleChange}
                name="lastname"
                placeholder="Lastname"
                className="w-1/2 rounded-xl border border-gray-300  px-3 py-5 focus:border-2 focus:border-blue-500 focus:outline-none "
                required
              />
            </div>
            <input
              id="email"
              type="email"
              onChange={handleChange}
              name="email"
              placeholder="Email"
              className="mb-6 w-full rounded-xl border border-gray-300 bg-blue-50 px-3 py-5 focus:border-2 focus:border-blue-500 focus:outline-none"
              required
            />
            <input
              id="password"
              type="password"
              onChange={handleChange}
              name="password"
              placeholder="Password"
              className="mb-6 w-full rounded-xl border border-gray-300 bg-blue-50 px-3 py-5 focus:border-2 focus:border-blue-500 focus:outline-none"
              required
            />
            <input
              id="dob"
              type="date"
              onChange={handleChange}
              name="dob"
              placeholder="Date of birth"
              className="mb-6 w-full rounded-xl border border-gray-300 bg-blue-50 px-3 py-5 focus:border-2 focus:border-blue-500 focus:outline-none"
              max={maxDateString}
              required
            />
            <select
              name="gender"
              id="gender"
              onChange={handleChange}
              className="mb-6 w-full rounded-xl border border-gray-300 bg-blue-50 px-3 py-5 focus:border-2 focus:border-blue-500 focus:outline-none"
              required
            >
              <option value="" disabled hidden selected>
                Select
              </option>
              <option value={"male"}>Male</option>
              <option value={"female"}>Female</option>
              <option value={"other"}>Other</option>
            </select>
            <input
              id="consent"
              type="checkbox"
              name="isCheck"
              onChange={handleChange}
              required
            />
            <label htmlFor="consent" className="ml-4 text-sm font-bold">
              I consent to sharing my information
            </label>
          </div>
          {error && (
            <div className="mb-6 rounded-lg bg-red-100 px-5 py-2 text-red-600">
              {error}
            </div>
          )}

          <button
            type="submit"
            className=" w-full rounded-lg bg-blue-500 px-3 py-5 text-white hover:bg-blue-600"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}
