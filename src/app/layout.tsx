import "./globals.css";
import { Roboto_Slab } from "next/font/google";
import React from "react";
import ReduxProvider from "@/redux/provider";
import { AuthContextProvider } from "@/context/AuthContext";

import Header from "../components/header/Header";

const poppins = Roboto_Slab({ weight: "400", subsets: ["latin"] });

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
        className={`box-border ${poppins.className} relative transform-none`}
      >
        <ReduxProvider>
          <AuthContextProvider>
            <Header />
            <div className="pt-[60px] h-full translate-z-0">{children}</div>
          </AuthContextProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
