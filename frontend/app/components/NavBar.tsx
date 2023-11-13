import React from "react";

export default function NavBar() {
  return (
    <nav className="p-4 text-xl shadow md:fixed md:h-full md:w-48 md:overflow-auto">
      <h1 className="text-3xl">ModernFit</h1>
      <div className="text-xl">
        {/* Links to pages */}
        <h2 className="border-b-2">Link</h2>
        <h2 className="border-b-2">Link</h2>
      </div>
    </nav>
  );
}
