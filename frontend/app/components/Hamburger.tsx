"use client";

import { RxHamburgerMenu } from "react-icons/rx";

export default function Hamburger() {
  return (
    <button
      className="lg:hidden"
      aria-controls="sidebar"
      onClick={toggleSidebar}
    >
      <span className="sr-only">Open sidebar</span>
      <RxHamburgerMenu className="h-5 w-5" />
    </button>
  );
}

const toggleSidebar = () => {
  const sidebar = document.getElementById("sidebar");
  sidebar?.classList.toggle("-translate-x-[100%]");
  const homeLink = document.getElementById("home-link");
};
