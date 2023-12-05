import React from "react";
import Link from "next/link";
export default function NotFound() {
  return (
    <main>
      <div className="  mt-14 h-screen text-center leading-10">
        <h3 className="text-2xl font-bold text-gray-500">Member not Found</h3>
        <p>We could not find the page you were looking for</p>
        <Link href="/members">
          <span className="text-blue-500">Go Back To Search page</span>
        </Link>
      </div>
    </main>
  );
}
