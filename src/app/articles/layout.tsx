import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex justify-center h-[1px] min-h-screen">
      <div>{children}</div>
    </div>
  );
};

export default Layout;
