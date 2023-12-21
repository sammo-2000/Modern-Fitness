import React from "react";

import { IoNotificationsSharp } from "react-icons/io5";
import { BsPeopleFill } from "react-icons/bs";
import Image from "next/image";
import profilePicture from "public/profile-pic.png";
import Link from "next/link";
import Hamburger from "./Hamburger";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between bg-white px-4 py-3 text-gray-700 shadow">
      <div className="flex items-center gap-6">
        <Hamburger />
        <div className="  ml-4 flex justify-center rounded-full bg-gray-200 px-2 py-2">
          <BsPeopleFill className=" h-5 w-5 text-blue-700" />
        </div>
      </div>

      <div className="flex items-center gap-8">
        <IoNotificationsSharp className="h-5 w-5 " />
        <Image
          src={profilePicture}
          width={100}
          height={100}
          alt="Profile Image"
          className="h-6 w-6 rounded-full"
        />
      </div>
    </header>
  );
}
