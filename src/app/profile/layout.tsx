import React from "react";
import Image from "next/image";

import stylishManWithCap from "@/assets/image/people/stylish-man-with-cap.svg";
import Auth from "@/components/Auth/Auth";

import ProfileSidebar from "./ProfileSidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative z-10 flex h-[calc(100vh-60px)] w-full flex-col items-center p-[20px]">
      <div className="relative h-full w-full overflow-y-hidden rounded-xl border-2 border-slate-400 shadow-[-15px_15px] shadow-black">
        <div className="absolute left-[20px] top-[20px] flex gap-3">
          <div className="h-[10px] w-[10px] rounded-full bg-[#F24C3D]" />
          <div className="h-[10px] w-[10px] rounded-full bg-[#F2BE22]" />
          <div className="h-[10px] w-[10px] rounded-full bg-[#22A699]" />
        </div>
        <div className="h-[50px] w-full rounded-t-xl border-b-2 border-black bg-slate-50" />
        <div className="flex h-[94%] gap-2 bg-[#FCF8E8]/30 pb-[60px] sm:pb-[65px] lg:pb-0">
          <div
            className={`fixed left-0 top-[calc(100%-60px)] z-20 h-fit w-full lg:sticky
            lg:bottom-0 lg:top-0 lg:h-[102%] lg:w-[230px] lg:min-w-[230px] lg:rounded-none lg:bg-white lg:pl-0 lg:pr-[15px] lg:pt-[25px] lg:shadow-md`}
          >
            <ProfileSidebar />
            <Image
              src={stylishManWithCap}
              alt="stylish man with cap"
              width={180}
              height={500}
              priority={true}
              className="absolute left-[25px] top-[calc(100%-350px)] z-0 hidden lg:block"
            />
          </div>
          <Auth isAuthNeeded={true}>{children}</Auth>
        </div>
      </div>
    </div>
  );
};

export default Layout;
