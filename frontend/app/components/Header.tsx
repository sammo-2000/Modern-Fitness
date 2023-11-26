import React from "react";
import { GoSearch } from "react-icons/go";
import { IoNotificationsSharp } from "react-icons/io5";
import { BsPeopleFill } from "react-icons/bs";
import Image from "next/image";
import picture from "public/profile.png";
import Link from "next/link";
import Hamburger from "./Hamburger";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between bg-white px-4 py-3 text-gray-700 shadow">
      <div className="flex items-center gap-6">
        <Hamburger />
        <Link href="/members">
          <GoSearch className="h-5 w-5" />
        </Link>
      </div>

      <div className="flex items-center gap-6">
        <BsPeopleFill className="h-5 w-5 " />
        <IoNotificationsSharp className="h-5 w-5 " />
        <Image
          src={picture}
          width={100}
          height={100}
          alt="Profile Image"
          className="h-6 w-6 rounded-full"
        />
      </div>
    </header>
  );
}
