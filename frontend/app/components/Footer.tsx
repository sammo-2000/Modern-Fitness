import { BsTwitter } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import { TfiYoutube } from "react-icons/tfi";
import { AiFillInstagram } from "react-icons/ai";
import { IoLocationSharp } from "react-icons/io5";
import { AiOutlineCopyrightCircle } from "react-icons/ai";

export default function Footer() {
  return (
    // footer styling for desktop or tablet
    <div className=" border border-y-0 border-neutral-700  bg-gray-800">
      <div className="text-bold justify-between py-6 text-xs">
        <div className="mr-16 flex gap-4 px-4 md:flex-wrap md:justify-end">
          <BsTwitter className=" h-8 w-8 rounded-full bg-neutral-100 p-1  text-blue-600 hover:bg-neutral-300" />
          <TfiYoutube className=" h-8 w-8 rounded-full bg-neutral-100 p-1  text-red-600 hover:bg-neutral-300" />{" "}
          <FaFacebookF className=" h-8 w-8  rounded-full bg-neutral-100 p-1  text-blue-600 hover:bg-neutral-300" />
          <AiFillInstagram className=" h-8 w-8 rounded-full bg-neutral-100 p-1 text-red-800 hover:bg-neutral-300" />
        </div>
      </div>

      <div>
        <div className=" mx-auto flex flex-row justify-center gap-4 px-2 pt-10">
          <p className=" flex flex-row gap-1 pb-3 text-xs  font-normal text-white">
            <IoLocationSharp className=" h-4 w-4 font-medium" /> United Kingdom
          </p>
          <p className=" flex flex-row gap-1 text-xs font-semibold text-white ">
            <AiOutlineCopyrightCircle /> {new Date().getFullYear()} Modern Gym.
            All Rights Reserved
          </p>
        </div>
      </div>
    </div>
  );
}
