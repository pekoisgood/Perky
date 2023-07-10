import React from "react";
import ProfileSidebar from "./ProfileSidebar";
import Auth from "./Auth";
import stylishManWithCap from "../../assets/image/stylish-man-with-cap.svg";
import sittingWomanHoldingLegs from "../../assets/image/woman-sitting-holding-both-legs.svg";
import Image from "next/image";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex flex-col items-center h-[calc(100vh-60px)] w-full p-[20px]">
      <div className="border-slate-400 border-2 w-full h-full relative rounded-xl shadow-[-15px_15px] shadow-black overflow-y-hidden">
        <div className="flex gap-3 absolute top-[20px] left-[20px]">
          <div className="rounded-full h-[10px] w-[10px] bg-[#F24C3D]" />
          <div className="rounded-full h-[10px] w-[10px] bg-[#F2BE22]" />
          <div className="rounded-full h-[10px] w-[10px] bg-[#22A699]" />
        </div>
        <div className="w-full h-[50px] border-b-2 border-black bg-slate-50 rounded-t-xl" />
        <div className="flex gap-2 h-[93%] pb-[40px] lg:pb-0">
          <div
            className={`h-[101%] flex lg:flex-col gap-4 lg:pr-[15px] lg:pt-[25px] fixed top-[calc(100%-60px)] left-[50%] translate-x-[-50%] z-10
            lg:sticky lg:top-0 lg:left-0 lg:bottom-0 lg:min-w-[200px] lg:translate-x-0 shadow-md`}
          >
            <ProfileSidebar />
            <Image
              src={stylishManWithCap}
              alt="stylish man with cap"
              width={180}
              height={500}
              className="hidden lg:block absolute top-[calc(100%-350px)] left-[25px]"
            />
          </div>
          {children}
          <Image
            src={sittingWomanHoldingLegs}
            alt="woman sitting holding both legs"
            width={200}
            height={500}
            className="scale-x-flip w-[150px] lg:w-[200px] absolute bottom-[-36px] right-0 md:right-[44px] rotate-[5deg] lg:z-0"
          />
        </div>
      </div>
      <Auth />
    </div>
  );
};

export default Layout;
