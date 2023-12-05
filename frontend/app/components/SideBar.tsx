import React, { useEffect, useState } from "react";
import Link from "next/link";
import options from "@/app/api/auth/[...nextauth]/Options";
import { getServerSession } from "next-auth";
import { CgGym } from "react-icons/cg";
import { GiProgression } from "react-icons/gi";
import { AiFillHome } from "react-icons/ai";
import { BsPersonFill } from "react-icons/bs";
import { RxHamburgerMenu } from "react-icons/rx";
import Image from "next/image";
import mainImg from "public/main-gym-img.jpg";
import { GetServerSidePropsContext } from "next";
import SidebarLink from "./SidebarLink";
interface SessionType {
  user: {
    name: string;
    // other properties...
  };
}

interface SideBarProps {
  session: SessionType | any; // Define the type as SessionType or any
}

export default async function SideBar() {
  const session = await getServerSession();

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
            <SidebarLink
              href="\"
              className=" my-2 mb-3  flex gap-4 p-2 hover:rounded-lg hover:bg-slate-700 hover:text-white "
              // onClick={closeSidebar}
            >
              <AiFillHome className=" ml-2 h-auto w-5 " /> Home
            </SidebarLink>
            {session ? (
              <>
                <SidebarLink
                  href=""
                  className=" mb-3 flex gap-4 p-2 hover:rounded-lg hover:bg-slate-700 hover:text-white "
                  // onClick={closeSidebar}
                >
                  <GiProgression className=" ml-2 h-auto w-5" />
                  Progress
                </SidebarLink>
                <SidebarLink
                  href="/profile"
                  className=" mb-3 flex gap-4 p-2 hover:rounded-lg hover:bg-slate-700 hover:text-white "
                  // onClick={closeSidebar}
                >
                  <BsPersonFill className=" ml-2 h-auto w-5" />
                  Account
                </SidebarLink>
                <SidebarLink
                  href=""
                  className=" mb-3 flex gap-4 p-2 hover:rounded-lg hover:bg-slate-700 hover:text-white "
                  // onClick={closeSidebar}
                >
                  <AiFillHome className=" ml-2 h-auto w-5" />
                  Settings
                </SidebarLink>
                <SidebarLink
                  href="/new-routines"
                  className=" mb-3 flex gap-4 p-2 hover:rounded-lg hover:bg-slate-700 hover:text-white "
                  // onClick={closeSidebar}
                >
                  <AiFillHome className=" ml-2 h-auto w-5" />
                  New Routine
                </SidebarLink>
                <SidebarLink
                  href="/api/auth/signout?callbackUrl=/"
                  className=" mb-3 flex gap-4 p-2 hover:rounded-lg hover:bg-slate-700 hover:text-white "
                  // onClick={closeSidebar}
                >
                  <AiFillHome className=" ml-2 h-auto w-5" />
                  SignOut
                </SidebarLink>
              </>
            ) : (
              <>
                <SidebarLink
                  href="registration"
                  className=" mb-3 flex gap-4 p-2 hover:rounded-lg hover:bg-slate-700 hover:text-white "
                  // onClick={closeSidebar}
                >
                  <AiFillHome className=" ml-2 h-auto w-5" />
                  Register
                </SidebarLink>
                <SidebarLink
                  href="/api/auth/signin"
                  className=" mb-3 flex gap-4 p-2 hover:rounded-lg hover:bg-slate-700 hover:text-white "
                  //  onClick={closeSidebar}
                >
                  <AiFillHome className=" ml-2 h-auto w-5" />
                  Login
                </SidebarLink>
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
            //  onClick={closeSidebar}
          >
            Check It Out
          </Link>
        </div>
      </div>
    </>
  );
}

// const closeSidebar = () => {
//   const sidebar = document.getElementById("sidebar");
//   sidebar?.classList.add("-translate-x-[100%]");
// };
