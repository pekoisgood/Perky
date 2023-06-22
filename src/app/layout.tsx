import "./globals.css";
import { Inter } from "next/font/google";
import React from "react";
import ReduxProvider from "@/redux/provider";

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
      <html lang="en">
        <ReduxProvider>
          <body className={`box-border ${inter.className}`}>{children}</body>
        </ReduxProvider>
      </html>
    </html>
  );
}
