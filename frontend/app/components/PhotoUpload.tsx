import React from "react";
import Image from "next/image";
import picture from "public/profile.png";
import { capitalizeFirstLetter } from "../utils/capitalize";

interface Props {
  firstName: string;
  lastName: string;
  gender: string;
}

function PhotoUpload(props: Props) {
  return (
    <div className="w-full min-w-[18.75rem] grow bg-white p-4 shadow-md lg:w-auto">
      <div className=" flex flex-col items-center">
        <Image
          src={picture}
          width={100}
          height={100}
          alt="Profile Image"
          className="mb-4 h-20 w-20 rounded-full"
        />

        <div className=" mb-6 space-y-2">
          <p className="text-center text-2xl font-semibold">
            {props.firstName} <span>{props.lastName}</span>
          </p>
          <p className="text-center text-sm text-gray-500">
            {capitalizeFirstLetter(props.gender)}
          </p>
        </div>
      </div>
      <hr className="my-3 " />
      <div className="flex justify-center">
        <button className=" focus:shadow-outline rounded  px-4 py-2 text-sm font-semibold text-blue-600 hover:text-blue-700 focus:outline-none">
          Upload Picture
        </button>
      </div>
    </div>
  );
}

export default PhotoUpload;
