import "./globals.css";
import { Inter } from "next/font/google";
import React from "react";
import ReduxProvider from "@/redux/provider";
import { AuthContextProvider } from "@/context/AuthContext";



const inter = Inter({ subsets: ["latin"] });

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
      <ReduxProvider>
        <AuthContextProvider>
          <body className={`box-border ${inter.className}`}>{children}</body>
        </AuthContextProvider>
      </ReduxProvider>
    </html>
  );
}
