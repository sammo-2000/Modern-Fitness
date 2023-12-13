import React from "react";

const Denied = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-slate-100">
      <div className="mx-4 my-20 flex max-w-[700px] flex-col items-center justify-center gap-4 rounded-2xl bg-white p-4 shadow-xl">
        <h1 className="text-center text-2xl font-extrabold uppercase text-red-500 sm:text-3xl lg:text-4xl">
          Unauthorized to view
        </h1>
        <p className="text-2xl font-extrabold text-red-700 lg:text-3xl">401</p>
        <img src="/no-access.png" alt="Access denised page" />
      </div>
    </div>
  );
};

export default Denied;
