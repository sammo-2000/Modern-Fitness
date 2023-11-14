import React from "react";
import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="p-4 text-xl shadow md:fixed md:h-full md:w-48 md:overflow-auto">
      <h1 className="text-3xl">ModernFit</h1>
      <div className="text-xl">
        {/* Links to pages */}
        <Link
          href="/"
          className="block w-full border-b-2 px-2 py-4 hover:bg-accent hover:text-white"
        >
          Home
        </Link>
        <Link
          href="/members"
          className="block w-full border-b-2 px-2 py-4 hover:bg-accent hover:text-white"
        >
          Member
        </Link>
      </div>
    </nav>
  );
}
