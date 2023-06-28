import ProfileSidebar from "@/components/ProfileSidebar";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex justify-center h-[1px] min-h-screen">
      <ProfileSidebar />
      <div>{children}</div>
    </div>
  );
};

export default Layout;
