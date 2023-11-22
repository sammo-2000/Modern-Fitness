"use client";
import React, { useState } from "react";
import PhotoUpload from "../components/PhotoUpload";

export default function Account() {
  const [SignUpForm, setSignUpForm] = useState({
    FirstName: "Davis",
    LastName: "Moore",
    Email: "Davismoore@yahoo.com",
    Location: "Sheffield, UK",
    Age: "21",
  });

  function handleChange(event: any) {
    const { name, value, type, checked } = event.target;
    setSignUpForm((prevForm) => ({
      ...prevForm,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleSubmission(event: any) {
    event.preventDefault();
    // Handle form submission here
  }

  const SignUpData = [
    "Sheffield, UK",
    "Sanpalo, Brazil",
    "London, UK",
    "Maryland, USA",
  ];

  let options = SignUpData.map((data) => {
    return <option value={data}>{data}</option>;
  });

  return (
    <div className="flex h-screen justify-center pt-32">
      <div className="flex w-[1200px] p-3">
        <div className="w-1/2 ">
          <div className="mb-3">
            <h1 className="text-3xl font-semibold">Account</h1>
          </div>
          <PhotoUpload
            FirstName={SignUpForm.FirstName}
            LastName={SignUpForm.LastName}
            Location={SignUpForm.Location}
          />
        </div>

        <div className="w-full ">
          <form
            onSubmit={handleSubmission}
            autoComplete="off"
            noValidate
            className="mb-4  bg-white px-8 pb-8 pt-6 "
          >
            <h1 className="mb-1 mt-10 text-xl font-bold">Profile</h1>
            <p className="mb-4 text-xs font-semibold text-gray-500">
              The information can be edited
            </p>
            <div className="mb-12 grid grid-cols-2 gap-5 ">
              <div>
                <div className="mb-1 text-end">
                  <label
                    className="block text-xs font-bold text-gray-400 "
                    htmlFor="FirstName"
                  >
                    First name*
                  </label>
                </div>
                <input
                  className="h-14 w-full appearance-none rounded-lg border px-3 py-2 font-medium leading-tight text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  id="FirstName"
                  type="text"
                  onChange={handleChange}
                  name="FirstName"
                  value={SignUpForm.FirstName}
                  required
                />
              </div>
              <div>
                <div className="mb-1 text-end">
                  <label
                    className="block text-xs font-bold text-gray-400"
                    htmlFor="LastName"
                  >
                    Last name*
                  </label>
                </div>
                <input
                  className="h-14 w-full appearance-none rounded-lg border px-3 py-2 font-medium leading-tight text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  id="LastName"
                  type="text"
                  onChange={handleChange}
                  name="LastName"
                  value={SignUpForm.LastName}
                  required
                />
              </div>
              <div>
                <div className="mb-1 text-end">
                  <label
                    className=" block text-xs font-bold text-gray-400"
                    htmlFor="email"
                  >
                    Email Address*
                  </label>
                </div>
                <input
                  className="h-14 w-full appearance-none rounded-lg border px-3 py-2 font-medium leading-tight text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  id="email"
                  type="email"
                  onChange={handleChange}
                  name="Email"
                  value={SignUpForm.Email}
                  required
                />
              </div>
              <div>
                <div className="mb-1 text-end">
                  <label
                    className="block text-xs font-bold text-gray-400"
                    htmlFor="AccessPin"
                  >
                    Access Pin
                  </label>
                </div>
                <p className="h-14 w-full appearance-none rounded-lg border px-3 pt-5 font-medium leading-tight text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  3456432
                </p>
              </div>
              <div>
                <div className="mb-1 text-end">
                  <label
                    className="block text-xs font-bold text-gray-400"
                    htmlFor="Age"
                  >
                    Age
                  </label>
                </div>
                <input
                  className="h-14 w-full appearance-none rounded-lg border px-3 py-2 font-medium leading-tight text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="number"
                  name="Age"
                  value={SignUpForm.Age}
                  onChange={handleChange}
                />
              </div>
              <div>
                <div className="mb-1 text-end">
                  <label
                    className="block text-xs font-bold text-gray-400"
                    htmlFor="Location"
                  >
                    Location
                  </label>
                </div>
                <select
                  className="h-14 w-full rounded-lg border px-3 py-2 font-medium text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  id="Location"
                  onChange={handleChange}
                  value={SignUpForm.Location}
                  name="Location"
                >
                  <option value="">---Select Location---</option>
                  {options}
                </select>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="rounded-lg bg-blue-500 px-3 py-2 font-bold text-white hover:bg-blue-700"
              >
                Save details
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
