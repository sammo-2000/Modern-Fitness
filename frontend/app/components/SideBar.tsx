import React from "react";
import Link from "next/link";
import { CgGym } from "react-icons/cg";
import { GiProgression } from "react-icons/gi";
import { AiFillHome } from "react-icons/ai";
import { BsPersonFill } from "react-icons/bs";
import Image from "next/image";
import mainImg from "public/main-gym-img.jpg";

export default function SideBar() {
  return (
    <div className="hide w-full bg-gray-800 text-white md:fixed md:h-screen md:w-64 md:overflow-y-auto">
      <div className=" border-b-1 mb-2 border border-x-0 border-t-0 border-gray-700 p-4 ">
        <div className="mb-8 ml-1 mt-4">
          <CgGym className=" h-10 w-10 rounded-md bg-blue-700" />
        </div>
        <div className=" mb-4  rounded-lg bg-slate-700 px-3 py-3 leading-6">
          <h1 className=" font-semibold">Modern</h1>
          <p className=" text-sm font-normal text-gray-300">Fitness Gym</p>
        </div>
      </div>
      <div className="border-b-1 border border-x-0 border-t-0 border-gray-700 pb-20">
        <div className="mx-4 py-3  text-sm font-semibold text-gray-400 ">
          <Link
            href="\"
            className=" my-2 mb-3  flex gap-4 p-2 hover:rounded-lg hover:bg-slate-700 hover:text-white "
          >
            <AiFillHome className=" ml-2 h-auto w-5 " /> Home
          </Link>
          <Link
            href=""
            className=" mb-3 flex gap-4 p-2 hover:rounded-lg hover:bg-slate-700 hover:text-white "
          >
            <GiProgression className=" ml-2 h-auto w-5" />
            Progress
          </Link>
          <Link
            href="profile"
            className=" mb-3 flex gap-4 p-2 hover:rounded-lg hover:bg-slate-700 hover:text-white "
          >
            <BsPersonFill className=" ml-2 h-auto w-5" />
            Account
          </Link>
          <Link
            href=""
            className=" mb-3 flex gap-4 p-2 hover:rounded-lg hover:bg-slate-700 hover:text-white "
          >
            <AiFillHome className=" ml-2 h-auto w-5" />
            Settings
          </Link>
          <Link
            href="registration"
            className=" mb-3 flex gap-4 p-2 hover:rounded-lg hover:bg-slate-700 hover:text-white "
          >
            <AiFillHome className=" ml-2 h-auto w-5" />
            Register
          </Link>
          <Link
            href="signIn"
            className=" mb-3 flex gap-4 p-2 hover:rounded-lg hover:bg-slate-700 hover:text-white "
          >
            <AiFillHome className=" ml-2 h-auto w-5" />
            Login
          </Link>
          <Link
            href=""
            className=" mb-3 flex gap-4 p-2 hover:rounded-lg hover:bg-slate-700 hover:text-white "
          >
            <AiFillHome className=" ml-2 h-auto w-5" />
            New Routine
          </Link>
        </div>
      </div>
      <div className=" bg-gray-800  py-5">
        <h2 className=" mb-1 px-3 text-sm font-medium">
          Tired of your Routine ?
        </h2>
        <p className=" mb-6 text-center text-sm text-gray-500">
          Check out our newly crafted routines.{" "}
        </p>
        <Image
          alt=""
          src={mainImg}
          width={400}
          height={400}
          className=" mb-4 rounded-xl px-2"
        />
        <Link
          href=""
          className="mx-2 flex justify-center rounded-lg bg-blue-500 px-3 py-2 text-sm font-bold text-white hover:bg-blue-600"
        >
          Check It Out
        </Link>
      </div>
    </div>
  );
}
