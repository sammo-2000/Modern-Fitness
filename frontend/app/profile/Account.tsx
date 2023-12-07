"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import PhotoUpload from "../components/PhotoUpload";
import { calculateAge } from "../utils/age";
import Notify from "../components/Notify";
import GetCookie from "../utils/getCookie";
const Token = GetCookie("token") || "";

export default function Account() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [first_name, setFirstName] = useState<string>("");
  const [last_name, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [accessCode, setAccessCode] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [goal, setGoal] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [allergy, setAllergy] = useState<string>("");
  const [vegan, setVegan] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

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
          setStatus(fetchedMembers.user.status);
          setRole(fetchedMembers.user.role);
          setGoal(fetchedMembers.user.goal);
          setHeight(fetchedMembers.user.height);
          setWeight(fetchedMembers.user.weight);
          setAllergy(fetchedMembers.user.allergy);
          setVegan(fetchedMembers.user.vegan);
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getInfo();

    console.log(first_name);
  }, [session]);

  function handleChange(event: any) {
    const { name, value } = event.target;

    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "height":
        setHeight(value);
        break;
      case "weight":
        setWeight(value);
        break;
      case "vegan":
        setVegan(value);
        break;
      case "goal":
        setGoal(value);
        break;
      case "allergy":
        setAllergy(value);
        break;
    }
  }

  const handleSubmission = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    const dataToSubmit = { email, height, weight, vegan, goal, allergy };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_FULL_DOMAIN}/api/user/`,
        {
          method: "PATCH",
          body: JSON.stringify(dataToSubmit),
          headers: {
            "Content-Type": "application/json",
            authorization: Token,
          },
        },
      );
      const data = await response.json();
      if (!response.ok) return setError(data.message);
      setSuccess("Details updated successfully");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  else
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
              <InputField
                type="text"
                label="First Name"
                name="first_name"
                value={first_name}
              />
              <InputField
                type="text"
                label="Last Name"
                name="last_name"
                value={last_name}
              />
              <InputField
                type="email"
                label="Email"
                name="email"
                value={email}
                edit={true}
                handleChange={handleChange}
              />
              <InputField
                type="text"
                label="Access Code"
                name="access_code"
                value={accessCode}
              />
              <InputField
                type="text"
                label="Age"
                name="age"
                value={age}
                isAge={true}
              />
              <InputField
                type="text"
                label="gender"
                name="gender"
                value={gender}
              />
              <InputField
                type="text"
                label="status"
                name="status"
                value={status}
              />
              <InputField type="text" label="role" name="role" value={role} />
              <InputField
                type="number"
                label="height"
                name="height"
                value={height}
                edit={true}
                handleChange={handleChange}
              />
              <InputField
                type="number"
                label="weight"
                name="weight"
                value={weight}
                edit={true}
                handleChange={handleChange}
              />
              <InputField
                type="text"
                label="vegan"
                name="vegan"
                value={vegan}
                edit={true}
                handleChange={handleChange}
              />
              <InputField
                type="text"
                label="goal"
                name="goal"
                value={goal}
                edit={true}
                handleChange={handleChange}
                textarea={true}
              />
              <InputField
                type="text"
                label="allergy"
                name="allergy"
                value={allergy}
                edit={true}
                handleChange={handleChange}
                textarea={true}
              />
            </div>
            {error ? <Notify message={error} /> : null}
            {success ? <Notify message={success} type="success" /> : null}
            <div className="flex justify-end">
              <button
                type="submit"
                className="mt-5 rounded-lg bg-blue-500 px-3 py-2 font-bold text-white hover:bg-blue-700"
              >
                Save details
              </button>
            </div>
          </form>
        </div>
      </div>
    );
}

const InputField = ({
  label,
  name,
  type,
  value,
  handleChange,
  edit = false,
  isAge = false,
  textarea = false,
}: {
  label: string;
  name: string;
  type: string;
  value: string;
  handleChange?: any;
  edit?: boolean;
  isAge?: boolean;
  textarea?: boolean;
}) => {
  return (
    <div>
      <div className="mb-1 text-end">
        <label className="block text-xs font-bold text-gray-400" htmlFor={name}>
          {label}
        </label>
      </div>
      {textarea ? (
        <textarea
          className="min-h-14 w-full appearance-none rounded-lg border px-3 py-2 font-medium leading-tight text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:bg-gray-300"
          name={name}
          id={name}
          value={isAge ? calculateAge(value) : value}
          onChange={handleChange}
          disabled={!edit}
        />
      ) : (
        <input
          className="h-14 w-full appearance-none rounded-lg border px-3 py-2 font-medium leading-tight text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:bg-gray-100"
          type={type}
          name={name}
          id={name}
          value={isAge ? calculateAge(value) : value}
          onChange={handleChange}
          disabled={!edit}
        />
      )}
    </div>
  );
};
