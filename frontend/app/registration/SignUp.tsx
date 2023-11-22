"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignUp() {
  const [firstname, setFirstName] = useState('')
  const [lastname, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [dob, setDob] = useState('')
  const [gender, setGender] = useState('')
  const router = useRouter()
  const [SignUpForm, setSignUpForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    dob:"",
    gender:"",
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
  const handleSubmission = async(e: any) => {
    e.preventDefault();
    try{
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({firstname, lastname, email, password, dob, gender})
      })
      if(res.status === 400){
        setErrorMessage("This email has already been registered")
      }if(res.status === 200){
        setErrorMessage("")
        router.push('/signin')
      }
    }
    catch(error){
      setErrorMessage("Error, something is wrong")
      console.log(error)
    }
    // fetch('http://localhost:3001/api/auth/signup', {
    //   method: 'POST',
    //   headers: {'Content-Type': 'application/json'},
    //   body: JSON.stringify({firstname, lastname, email, password, dob, gender})
    // })


    if (!SignUpForm.firstname) {
      setErrorMessage("Enter your firstname");
    } else if (SignUpForm.lastname === "") {
      setErrorMessage("Enter your lastname");
    } else if (SignUpForm.email === "") {
      setErrorMessage("Enter your email address");
    } else if (SignUpForm.password === "") {
      setErrorMessage("Enter your Password");
    } else if(SignUpForm.dob === ""){
      setErrorMessage("Include you date of birth")
    }else if (SignUpForm.isCheck === false) {
      setErrorMessage("Please select checkbox");
    } else if(SignUpForm.gender === "Gender"){
      setErrorMessage("Please choose between the last three options")
    }else {
      console.log(SignUpForm);
      setErrorMessage("");
    }
  }

  return (
    <div className=" flex h-screen items-center justify-center mb-11">
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
                  name="firstname"
                  placeholder="Firstname"
                  className="mr-2  h-[65px]  w-1/2 rounded-xl border  border-gray-300 p-2 focus:border-2 focus:border-blue-500 focus:outline-none"
                />
                <input
                  id="LastName"
                  type="text"
                  onChange={handleChange}
                  name="lastname"
                  placeholder="Lastname"
                  className=" h-[65px] w-1/2  rounded-xl border border-gray-300  p-2 focus:border-2 focus:border-blue-500 focus:outline-none "
                />
              </div>
              <input
                id="email"
                type="email"
                onChange={handleChange}
                name="email"
                placeholder="Email"
                className="mb-6  h-[65px] w-full rounded-xl border border-gray-300 bg-blue-50 p-3 focus:border-2 focus:border-blue-500 focus:outline-none"
              />

              <input
                id="password"
                type="password"
                onChange={handleChange}
                name="password"
                placeholder="Password"
                className="mb-6 h-[65px] w-full rounded-xl border border-gray-300 bg-blue-50 p-3 focus:border-2 focus:border-blue-500 focus:outline-none"
              />

              <input
                id="dob"
                type="date"
                onChange={handleChange}
                name="dob"
                placeholder="Date of birth"
                className="mb-6 h-[65px] w-full rounded-xl border border-gray-300 bg-blue-50 p-3 focus:border-2 focus:border-blue-500 focus:outline-none"
              />

              <select name="gender" 
              id="gender"
              className="mb-6 h-[65px] w-full rounded-xl border border-gray-300 bg-blue-50 p-3 focus:border-2 focus:border-blue-500 focus:outline-none">
                <option value="gender" 
                >
                  Gender
                </option>
                <option value="gender">
                  Male
                </option>
                <option value="gender">
                  Female
                </option>
                <option value="gender">
                  Other
                </option>
              </select>

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
