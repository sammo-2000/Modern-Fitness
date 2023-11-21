import React from "react";
import Image from "next/image";
import mainImg from "public/main-gym-img.jpg";
import homepageImg from "public/homepage-img.png";
import { SiOpenaccess } from "react-icons/si";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="relative flex items-center justify-center text-center">
        <Image
          src={mainImg}
          width={2000}
          height={200}
          alt="main img"
          className="min-h-[600px] object-cover"
        />

        <div className="absolute mx-auto text-gray-100">
          <h1 className="mb-12 bg-gradient-to-r from-gray-900  via-gray-800 to-white  bg-clip-text font-serif text-4xl font-extrabold text-transparent md:text-8xl">
            Discover Your Potential
          </h1>
          <p className="mx-auto mb-20 max-w-max rounded-full bg-black bg-opacity-60 px-4 py-2 text-center font-mono text-3xl font-bold">
            Begin Your Journey Today
          </p>
          <Link
            href="registration"
            className="  rounded-2xl bg-gradient-to-r from-blue-400 to-blue-600 px-20 py-6 font-semibold hover:bg-blue-600"
          >
            Register
          </Link>
        </div>
      </div>
      <div className="mb-16 text-center">
        <h2 className="mx-auto mt-16 font-mono text-3xl font-extrabold">
          OFFERS
        </h2>
        <div className="mx-auto h-1 w-8 rounded-full bg-blue-500"></div>
      </div>
      <div className="mb-20 flex flex-wrap justify-center gap-10 px-6">
        <div className="max-w-sm flex-grow basis-80 rounded-lg border bg-neutral-100 px-6 py-4 shadow-md ">
          <h3>{<SiOpenaccess className=" mx-auto mb-8 h-auto w-10" />}</h3>
          <h4 className="mb-12 text-center font-semibold text-black">
            24/7 Access
          </h4>
          <p className=" leading-7">
            Modern gym provides 24/7, 365 days access to our members, so you
            never have to worry about accessing our gym facility
          </p>
        </div>

        <div className="max-w-sm flex-grow basis-80 rounded-lg border bg-neutral-100 px-6 py-4 shadow-md">
          <h3>{<SiOpenaccess className=" mx-auto mb-8 h-auto w-10" />}</h3>
          <h4 className="mb-12 text-center font-semibold text-black">
            24/7 Access
          </h4>
          <p className="leading-7">
            Modern gym provides 24/7, 365 days access to our members, so you
            never have to worry about accessing our gym facility
          </p>
        </div>

        <div className="max-w-sm flex-grow basis-80 rounded-lg border bg-neutral-100 px-6 py-4 shadow-md">
          <h3>{<SiOpenaccess className=" mx-auto mb-8 h-auto w-10" />}</h3>
          <h4 className="mb-12 text-center font-semibold text-black">
            24/7 Access
          </h4>
          <p className="leading-7">
            Modern gym provides 24/7, 365 days access to our members, so you
            never have to worry about accessing our gym facility
          </p>
        </div>

        <div className="max-w-sm flex-grow basis-80 rounded-lg border bg-neutral-100 px-6 py-4 shadow-md">
          <h3>{<SiOpenaccess className=" mx-auto mb-8 h-auto w-10" />}</h3>
          <h4 className="mb-12 text-center font-semibold text-black">
            24/7 Access
          </h4>
          <p className="leading-7">
            Modern gym provides 24/7, 365 days access to our members, so you
            never have to worry about accessing our gym facility
          </p>
        </div>
      </div>
      <Image
        src={homepageImg}
        width={1300}
        height={700}
        alt="homepage img"
        className="mx-auto mb-8 object-cover lg:h-[600px]"
      />
      <div className="mb-16 text-center">
        <h2 className="mx-auto mt-16 font-mono text-3xl font-extrabold">
          HOW IT WORKS
        </h2>
        <div className="mx-auto h-1 w-8 rounded-full bg-blue-500"></div>
      </div>
      <div className="mb-14 flex flex-wrap justify-center gap-10 px-6">
        <div className="max-w-sm flex-grow basis-80 px-8 py-4 shadow">
          <h3 className="mb-12 text-center font-mono text-2xl font-bold text-blue-500">
            1.
          </h3>
          <h4>{<SiOpenaccess className=" mx-auto mb-8 h-auto w-10" />}</h4>
          <p className=" leading-7">
            Modern gym provides 24/7, 365 days access to our members, so you
            never have to worry about accessing our gym facility
          </p>
        </div>

        <div className=" max-w-sm flex-grow basis-80 px-8 py-4 shadow">
          <h3 className="mb-12 text-center font-mono text-2xl font-bold  text-blue-500">
            2.
          </h3>
          <h4>{<SiOpenaccess className=" mx-auto mb-8 h-auto w-10" />}</h4>
          <p className=" leading-7">
            Modern gym provides 24/7, 365 days access to our members, so you
            never have to worry about accessing our gym facility
          </p>
        </div>

        <div className=" max-w-sm flex-grow basis-80 px-8 py-4 shadow">
          <h3 className="mb-12 text-center font-mono text-2xl font-bold  text-blue-500">
            3.
          </h3>
          <h4>{<SiOpenaccess className=" mx-auto mb-8 h-auto w-10" />}</h4>
          <p className=" leading-7">
            Modern gym provides 24/7, 365 days access to our members, so you
            never have to worry about accessing our gym facility
          </p>
        </div>
      </div>
      <Link
        href="registration"
        className="mx-auto mb-48 block w-max bg-blue-500 px-10 py-4 font-bold text-white hover:bg-blue-600"
      >
        GET STARTED
      </Link>
    </>
  );
}
