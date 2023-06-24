import ProfileSidebar from "@/components/ProfileSidebar";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex items-center justify-center mt-10">
      <ProfileSidebar />
      {children}
    </div>
  );
};

export default Layout;
