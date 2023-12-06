"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import PhotoUpload from "../components/PhotoUpload";
import { calculateAge } from "../utils/age";
import GetCookie from "../utils/getCookie";
const Token = GetCookie("token") || "";

export default function Account() {
  const [first_name, setFirstName] = useState<string>("");
  const [last_name, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [accessCode, setAccessCode] = useState<string>("");

  const { data: session } = useSession();

  useEffect(() => {
    const getInfo = async () => {
      try {
        if (session?.user) {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_FULL_DOMAIN}/api/user`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                authorization: Token,
              },
            },
          );
          if (!res.ok) {
            throw new Error("Failed to fetch members");
          }
          const fetchedMembers = await res.json();
          console.log(fetchedMembers);
          setFirstName(fetchedMembers.user.first_name);
          setLastName(fetchedMembers.user.last_name);
          setAccessCode(fetchedMembers.user.access_code);
          setEmail(fetchedMembers.user.email);
          setGender(fetchedMembers.user.gender);
          setAge(fetchedMembers.user.dob);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getInfo();
  }, [session]);

  function handleChange(event: any) {
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

      case "dob":
        setAge(value);
        break;
      case "gender":
        setGender(value);
        break;
    }
  }

  const handleSubmission = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_FULL_DOMAIN}/api/user/`,
          {
            method: "PATCH",
            body: JSON.stringify({ first_name, last_name, email, gender }),
            headers: {
              "Content-Type": "application/json",
              authorization: Token,
            },
          },
        );
        if (res.ok) {
          // Content successfully updated

          console.log("update Successful");
        } else {
          // Handle errors if needed

          console.error("update Failed");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getGender = ["Male", "Female", "Non-binary", "Others"];

  let options = getGender.map((gender) => {
    return <option value={gender}>{gender}</option>;
  });

  return (
    <div className="w-full flex-1 p-3">
      <h1 className="mb-3 text-3xl font-semibold">Account</h1>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <PhotoUpload
          FirstName={first_name}
          LastName={last_name}
          Location={gender}
        />

        <form
          onSubmit={handleSubmission}
          autoComplete="off"
          noValidate
          className="mb-4 grow bg-white px-8 pb-8 pt-6"
        >
          <h1 className="mb-1 mt-10 text-xl font-bold">Profile</h1>
          <p className="mb-4 text-xs font-semibold text-gray-500">
            The information can be edited
          </p>
          <div className="mb-12 grid grid-cols-1 gap-5 sm:grid-cols-2">
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
                name="firstname"
                value={first_name}
                required
              />
            </div>
            <div>
              <div className="mb-1 text-end">
                <label
                  className="block text-xs font-bold text-gray-400"
                  htmlFor="lastname"
                >
                  Last name*
                </label>
              </div>
              <input
                className="h-14 w-full appearance-none rounded-lg border px-3 py-2 font-medium leading-tight text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="LastName"
                type="text"
                onChange={handleChange}
                name="lastname"
                value={last_name}
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
                name="email"
                value={email}
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
                {accessCode}
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
                name="age"
                value={calculateAge(age)}
                onChange={handleChange}
              />
            </div>
            <div>
              <div className="mb-1 text-end">
                <label
                  className="block text-xs font-bold text-gray-400"
                  htmlFor="Location"
                >
                  Gender
                </label>
              </div>
              <select
                className="h-14 w-full rounded-lg border px-3 py-2 font-medium text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="Location"
                onChange={handleChange}
                value={gender}
                name="gender"
              >
                <option value="">{gender}</option>
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
  );
}
