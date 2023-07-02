import ProfileSidebar from "@/app/profile/ProfileSidebar";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex flex-col items-center h-[calc(100vh-60px)] w-full">
      <div className="border-slate-400 border-2 w-full h-[96%] relative rounded-xl shadow-[-15px_15px] shadow-black overflow-y-auto">
        <div className="flex gap-3 absolute top-[20px] left-[20px]">
          <div className="rounded-full h-[10px] w-[10px] bg-[#F24C3D]" />
          <div className="rounded-full h-[10px] w-[10px] bg-[#F2BE22]" />
          <div className="rounded-full h-[10px] w-[10px] bg-[#22A699]" />
        </div>
        <div className="w-full h-[50px] border-b-2 border-black bg-slate-50 rounded-t-xl" />
        <div className="p-10 pb-[80px] overflow-scroll h-[90%]">{children}</div>
        <div className="sticky bottom-[-70px] left-[50%]">
          <ProfileSidebar />
        </div>
      </div>
    </div>
  );
};

export default Layout;
