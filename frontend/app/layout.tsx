import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ProgramsContextProvider } from "./context/programContext";
import { FetchDataProvider } from "./context/MemberIdContext";
//components
import SideBar from "./components/SideBar";
import Footer from "./components/Footer";
import Header from "./components/Header";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ModernFit Gym",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <FetchDataProvider>
      <ProgramsContextProvider>
        <html lang="en">
          <body className={inter.className}>
            <Header />
            <SideBar />
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
  );
}
