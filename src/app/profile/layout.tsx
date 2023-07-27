import React from "react";
import Image from "next/image";

import stylishManWithCap from "@/assets/image/people/stylish-man-with-cap.svg";
import sittingWomanHoldingLegs from "@/assets/image/people/woman-sitting-holding-both-legs.svg";
import Auth from "@/components/Auth/Auth";

import ProfileSidebar from "./ProfileSidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex flex-col items-center h-[calc(100vh-60px)] w-full p-[20px] z-10">
      <div className="border-slate-400 border-2 w-full h-full relative rounded-xl shadow-[-15px_15px] shadow-black overflow-y-hidden">
        <div className="flex gap-3 absolute top-[20px] left-[20px]">
          <div className="rounded-full h-[10px] w-[10px] bg-[#F24C3D]" />
          <div className="rounded-full h-[10px] w-[10px] bg-[#F2BE22]" />
          <div className="rounded-full h-[10px] w-[10px] bg-[#22A699]" />
        </div>
        <div className="w-full h-[50px] border-b-2 border-black bg-slate-50 rounded-t-xl" />
        <div className="flex gap-2 h-[94%] pb-[40px] lg:pb-0 bg-[#FCF8E8]/30">
          <Image
            src={sittingWomanHoldingLegs}
            alt="woman sitting holding both legs"
            width={200}
            height={500}
            priority={true}
            className="scale-x-flip w-[150px] lg:w-[200px] absolute bottom-[-36px] right-0 md:right-[44px] rotate-[5deg] lg:z-0"
          />
          <div
            className={`fixed top-[calc(100%-60px)] w-full shadow-md
            lg:h-[102%] lg:w-[230px] lg:min-w-[230px] lg:pr-[15px] lg:pl-0 lg:pt-[25px] lg:sticky lg:top-0 lg:left-0 lg:bottom-0 lg:bg-white lg:rounded-none`}
          >
            <ProfileSidebar />
            <Image
              src={stylishManWithCap}
              alt="stylish man with cap"
              width={180}
              height={500}
              priority={true}
              className="hidden lg:block absolute top-[calc(100%-350px)] left-[25px] z-0"
            />
          </div>
          <Auth isAuthNeeded={true}>{children}</Auth>
        </div>
      </div>
    </div>
  );
};

export default Layout;
