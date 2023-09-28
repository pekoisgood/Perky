import React from "react";
import { Poppins } from "next/font/google";
import Script from "next/script";

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
      <head>
        {/* Google tag (gtag.js) */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-DWFHWZTW7X"
        ></Script>
        <Script id="gtag-init">
          {` window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-0RB5G1Q2EX';`}
        </Script>
      </head>
      <body
        className={`box-border ${poppins.className} transform-none relative mx-auto`}
      >
        <ReduxProvider>
          <Header />
          <div className="pt-[60px] w-full h-full translate-z-0">
            <div className="fixed top-0 bottom-0 left-0 right-0 w-full pt-[60px]">
              <div className="absolute top-[calc(100%-240px)] left-0 bg-[#E5E0FF] w-[400px] h-[400px] rounded-[59%_41%_43%_57%/37%_55%_45%_63%] z-0" />
              <div className="absolute top-0 right-0 bg-[#E9EDC9] w-[500px] h-[400px] rounded-[52%_48%_60%_40%/59%_51%_49%_41%] z-0" />
            </div>
            <Auth>{children}</Auth>
          </div>
        </ReduxProvider>
      </body>
    </html>
  );
}
