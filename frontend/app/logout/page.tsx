"use client";
import { signOut } from "next-auth/react";
import { useEffect } from "react";

const Logout = () => {
  useEffect(() => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "role=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    signOut({ callbackUrl: "/" });
  }, []);
};

export default Logout;
