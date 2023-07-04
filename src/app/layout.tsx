import "./globals.css";
import { Poppins } from "next/font/google";
import React from "react";
import ReduxProvider from "@/redux/provider";
import { AuthContextProvider } from "@/context/AuthContext";

import Header from "../components/header/Header";

const poppins = Poppins({
  weight: ["400", "700", "500", "800"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Perky",
  description: "A code learning community. Learn together, empower one anther.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`box-border ${poppins.className} transform-none max-w-[1280px] mx-auto`}
      >
        <ReduxProvider>
          <AuthContextProvider>
            <Header />
            <div className="pt-[60px] w-full h-full translate-z-0 ">
              {children}
            </div>
          </AuthContextProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
