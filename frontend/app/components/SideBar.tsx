"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { CgGym } from "react-icons/cg";
import { GiProgression } from "react-icons/gi";
import { AiFillHome } from "react-icons/ai";
import { BsPersonFill } from "react-icons/bs";
import { RxHamburgerMenu } from "react-icons/rx";
import Image from "next/image";
import mainImg from "public/main-gym-img.jpg";

export default function SideBar() {
  const [role, setRole] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const getCookie = (name: string) => {
      const cookies = document.cookie.split("; ");
      for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.startsWith(name + "=")) {
          return cookie.substring(name.length + 1);
        }
      }
      return null;
    };

    const token = getCookie("token");
    const role = getCookie("role");
    setRole(role);
    setRole(token);
  });
  return (
    <>
      <div
        id="sidebar"
        className="height-screen hide-scrollbar fixed z-20 w-full -translate-x-[100%] overflow-y-auto bg-gray-800 text-white transition-transform lg:fixed lg:w-64 lg:translate-x-0 lg:overflow-y-auto"
      >
        <div className=" border-b-1 mb-2 border border-x-0 border-t-0 border-gray-700 p-4 ">
          <div className="mb-8 ml-1 mt-4">
            <CgGym className=" h-10 w-10 rounded-md bg-blue-700" />
          </div>
          <div className=" mb-4  rounded-lg bg-slate-700 px-3 py-3 leading-6">
            <h1 className=" font-semibold">ModernFit</h1>
            <p className=" text-sm font-normal text-gray-300">
              The Personalised Gym
            </p>
          </div>
        </div>
        <div className="border-b-1 border border-x-0 border-t-0 border-gray-700">
          <div className="mx-4 py-3  text-sm font-semibold text-gray-400 ">
            <Link
              href="\"
              className=" my-2 mb-3  flex gap-4 p-2 hover:rounded-lg hover:bg-slate-700 hover:text-white "
              onClick={closeSidebar}
            >
              <AiFillHome className=" ml-2 h-auto w-5 " /> Home
            </Link>
            {role ? (
              <>
                <Link
                  href=""
                  className=" mb-3 flex gap-4 p-2 hover:rounded-lg hover:bg-slate-700 hover:text-white "
                  onClick={closeSidebar}
                >
                  <GiProgression className=" ml-2 h-auto w-5" />
                  Progress
                </Link>
                <Link
                  href="/profile"
                  className=" mb-3 flex gap-4 p-2 hover:rounded-lg hover:bg-slate-700 hover:text-white "
                  onClick={closeSidebar}
                >
                  <BsPersonFill className=" ml-2 h-auto w-5" />
                  Account
                </Link>
                <Link
                  href=""
                  className=" mb-3 flex gap-4 p-2 hover:rounded-lg hover:bg-slate-700 hover:text-white "
                  onClick={closeSidebar}
                >
                  <AiFillHome className=" ml-2 h-auto w-5" />
                  Settings
                </Link>
                <Link
                  href=""
                  className=" mb-3 flex gap-4 p-2 hover:rounded-lg hover:bg-slate-700 hover:text-white "
                  onClick={closeSidebar}
                >
                  <AiFillHome className=" ml-2 h-auto w-5" />
                  New Routine
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/registration"
                  className=" mb-3 flex gap-4 p-2 hover:rounded-lg hover:bg-slate-700 hover:text-white "
                  onClick={closeSidebar}
                >
                  <AiFillHome className=" ml-2 h-auto w-5" />
                  Register
                </Link>
                <Link
                  href="/login"
                  className=" mb-3 flex gap-4 p-2 hover:rounded-lg hover:bg-slate-700 hover:text-white "
                  onClick={closeSidebar}
                >
                  <AiFillHome className=" ml-2 h-auto w-5" />
                  Login
                </Link>
              </>
            )}
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
            onClick={closeSidebar}
          >
            Check It Out
          </Link>
        </div>
      </div>
    </>
  );
}

const closeSidebar = () => {
  const sidebar = document.getElementById("sidebar");
  sidebar?.classList.add("-translate-x-[100%]");
};
