import Auth from "@/app/profile/Auth";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-screen h-[calc(100vh-60px)] fixed top-[60px] bg-black p-2 left-0 z-100">
      {children}
      <Auth />
    </div>
  );
};

export default Layout;
