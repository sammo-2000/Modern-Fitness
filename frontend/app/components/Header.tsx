import React from "react";
import { GoSearch } from "react-icons/go";
import { IoNotificationsSharp } from "react-icons/io5";
import { BsPeopleFill } from "react-icons/bs";
import Image from "next/image";
import picture from "public/profile.png";
import Link from "next/link";

function Header() {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between bg-white px-4 py-3 text-gray-700 shadow">
      <Link href="members" className="ml-10 lg:ml-0">
        <GoSearch className="h-5 w-5" />
      </Link>

      <div className="flex gap-6 ">
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

export default Header;
