// pages/your-page.tsx
import React, { Children } from "react";
import RootLayout from "../layout";
import { getServerSession } from "next-auth";
import { GetServerSidePropsContext } from "next";
import SideBar from "./SideBar";

interface YourPageProps {
  session: any; // Define the type for session according to your session structure
}

const YourPage = ({ session }: YourPageProps) => {
  return (
    <RootLayout session={session}>
      <SideBar />
    </RootLayout>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession();

  return {
    props: {
      session,
    },
  };
}

export default YourPage;
