import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex justify-center md:justify-start lg:justify-evenly h-full min-h-auto overflow-scroll md:pr-[17px] w-full">
      {children}
    </div>
  );
};

export default Layout;
