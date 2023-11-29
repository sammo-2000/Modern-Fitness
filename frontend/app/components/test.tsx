import React from "react";
import { Inter } from "next/font/google";
import { getServerSession } from "next-auth";
import { GetServerSidePropsContext } from "next";

const inter = Inter({ subsets: ["latin"] });
import { ProgramsContextProvider } from "../context/programContext";
import { FetchDataProvider } from "../context/MemberIdContext";
import AuthProvider from "../components/AuthProvider";
import SideBar from "../components/SideBar";
import Footer from "../components/Footer";
import Header from "../components/Header";
interface RootLayoutProps {
  children: React.ReactNode;
  session: any; // Define the type for session according to your session structure
}
function test({ children, session }: RootLayoutProps) {
  return (
    <AuthProvider session={session}>
      <FetchDataProvider>
        <ProgramsContextProvider>
          <html lang="en">
            <body className={inter.className}>
              <Header />
              <SideBar />
              {/* Pass the session prop to SideBar */}
              {/* The flex below is for keeping the footer at the bottom */}
              <div className="min-height-screen flex flex-col lg:ml-64">
                <main className="flex flex-1 flex-col items-center justify-center">
                  {children}
                </main>
                <Footer />
              </div>
            </body>
          </html>
        </ProgramsContextProvider>
      </FetchDataProvider>
    </AuthProvider>
  );
}

export default test;
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession();

  return {
    props: {
      session,
    },
  };
}
