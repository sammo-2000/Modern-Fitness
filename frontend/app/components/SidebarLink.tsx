"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { IconType } from "react-icons/lib";

interface SidebarLinkProps {
  href: string;
  className: string;
  children: ReactNode;
}

export default function SidebarLink(props: SidebarLinkProps) {
  return (
    <Link href={props.href} className={props.className} onClick={closeSidebar}>
      {props.children}
    </Link>
  );
}

const closeSidebar = () => {
  const sidebar = document.getElementById("sidebar");
  sidebar?.classList.add("-translate-x-[100%]");
};
