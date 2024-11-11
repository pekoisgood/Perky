import React from "react";
import { Poppins } from "next/font/google";
import "./globals.css";

import ReduxProvider from "@/redux/provider";

import Header from "../components/Header/Header";
import Auth from "../components/Auth/Auth";

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800"],
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
        className={`box-border ${poppins.className} relative mx-auto transform-none`}
        suppressHydrationWarning={true}
      >
        <ReduxProvider>
          <Header />
          <div className="translate-z-0 h-full w-full px-4 pt-[60px]">
            <div className="fixed bottom-0 left-0 right-0 top-0 w-full pt-[60px]">
              <div className="absolute left-0 top-[calc(100%-240px)] z-0 h-[400px] w-[400px] rounded-[59%_41%_43%_57%/37%_55%_45%_63%] bg-[#E5E0FF]" />
              <div className="absolute right-0 top-0 z-0 h-[400px] w-[500px] rounded-[52%_48%_60%_40%/59%_51%_49%_41%] bg-[#E9EDC9]" />
            </div>
            <Auth>{children}</Auth>
          </div>
        </ReduxProvider>
      </body>
    </html>
  );
}
