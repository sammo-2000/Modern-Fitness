import React from "react";
import Image from "next/image";
import mainImg from "public/main-gym-img.jpg";
import fitness from "public/fitness_icon.jpg";
import homepageImg from "public/homepage-img.png";
import { SiOpenaccess } from "react-icons/si";
import Link from "next/link";

function LandingPage() {
  return (
    <div className="ml-1/5 bg-white">
      <div className="relative  justify-center text-center ">
        <Image
          src={mainImg}
          width={2000}
          height={200}
          alt="main img"
          className=" object-cover lg:h-[800px]"
        />

        <div className="absolute top-80 ml-44 text-gray-100">
          <h1 className=" mb-12 bg-gradient-to-r  from-gray-900 via-gray-800  to-white bg-clip-text font-serif text-8xl font-extrabold text-transparent">
            Discover Your Potential
          </h1>
          <p className="mb-20 text-center font-mono  text-3xl font-bold ">
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
      <div className=" bg-backgroung-img">
        <div className=" mx-auto  lg:w-[1300px]">
          <div className=" text-center ">
            <h2 className=" mt-16 font-mono  text-3xl font-extrabold  ">
              OFFERS
            </h2>
            <div className="flex justify-center">
              <p className=" mb-16 mt-2 h-1 w-8 rounded-full bg-blue-500 text-center"></p>
            </div>
          </div>

          <div className=" mb-20 grid grid-cols-3 gap-10">
            <div className="  rounded-lg border bg-neutral-100 px-6 py-4 shadow-md">
              <h3>{<SiOpenaccess className=" mx-auto mb-8 h-auto w-10" />}</h3>
              <h4 className="mb-12 text-center font-semibold text-black">
                24/7 Access
              </h4>
              <p className=" leading-7">
                Modern gym provides 24/7, 365 days access to our members, so you
                never have to worry about accessing our gym facility
              </p>
            </div>

            <div className="   rounded-lg border bg-neutral-100 px-6 py-4 shadow-md">
              <h3>{<SiOpenaccess className=" mx-auto mb-8 h-auto w-10" />}</h3>
              <h4 className="mb-12 text-center font-semibold text-black">
                24/7 Access
              </h4>
              <p className=" leading-7">
                Modern gym provides 24/7, 365 days access to our members, so you
                never have to worry about accessing our gym facility
              </p>
            </div>

            <div className=" rounded-lg border bg-neutral-100 px-6 py-4 shadow-md">
              <h3>{<SiOpenaccess className=" mx-auto mb-8 h-auto w-10" />}</h3>
              <h4 className="mb-12 text-center font-semibold text-black">
                24/7 Access
              </h4>
              <p className=" leading-7">
                Modern gym provides 24/7, 365 days access to our members, so you
                never have to worry about accessing our gym facility
              </p>
            </div>

            <div className=" rounded-lg border bg-neutral-100 px-6 py-4 shadow-md">
              <h3>{<SiOpenaccess className=" mx-auto mb-8 h-auto w-10" />}</h3>
              <h4 className="mb-12 text-center font-semibold text-black">
                24/7 Access
              </h4>
              <p className=" leading-7">
                Modern gym provides 24/7, 365 days access to our members, so you
                never have to worry about accessing our gym facility
              </p>
            </div>
          </div>

          <div className="flex justify-center text-center">
            <Image
              src={homepageImg}
              width={1300}
              height={700}
              alt="homepage img"
              className="mb-8 object-cover lg:h-[550px]"
            />
          </div>
          <h2 className=" mt-16 text-center font-mono text-3xl font-extrabold">
            HOW IT WORKS
          </h2>
          <div className="flex justify-center">
            <p className=" mb-16 mt-2 h-1 w-8 rounded-full bg-blue-500 text-center"></p>
          </div>
          <div className=" mb-14 grid grid-cols-3 gap-10">
            <div className=" px-8 py-4">
              <h3 className="my-12 text-center font-mono text-2xl font-bold text-blue-500">
                1.
              </h3>
              <h4>{<SiOpenaccess className=" mx-auto mb-8 h-auto w-10" />}</h4>
              <p className=" leading-7">
                Modern gym provides 24/7, 365 days access to our members, so you
                never have to worry about accessing our gym facility
              </p>
            </div>

            <div className=" px-8 py-4">
              <h3 className="my-12 text-center font-mono text-2xl font-bold  text-blue-500">
                2.
              </h3>
              <h4>{<SiOpenaccess className=" mx-auto mb-8 h-auto w-10" />}</h4>
              <p className=" leading-7">
                Modern gym provides 24/7, 365 days access to our members, so you
                never have to worry about accessing our gym facility
              </p>
            </div>

            <div className=" px-8 py-4">
              <h3 className="my-12 text-center font-mono text-2xl font-bold  text-blue-500">
                3.
              </h3>
              <h4>{<SiOpenaccess className=" mx-auto mb-8 h-auto w-10" />}</h4>
              <p className=" leading-7">
                Modern gym provides 24/7, 365 days access to our members, so you
                never have to worry about accessing our gym facility
              </p>
            </div>
          </div>
          <div className=" mb-60 flex justify-center">
            <Link
              href="registration"
              className=" mx-auto  bg-blue-500 px-10 py-4 font-bold text-white hover:bg-blue-600"
            >
              GET STARTED
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
