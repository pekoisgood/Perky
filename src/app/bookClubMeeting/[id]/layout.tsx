import React from "react";
import Auth from "@/components/Auth/Auth";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-screen h-[calc(100vh-60px)] fixed top-[60px] bg-black p-2 left-0 z-100">
      <Auth isAuthNeeded={true}>{children}</Auth>
    </div>
  );
};

export default Layout;
