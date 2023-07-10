import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex justify-center md:justify-start lg:justify-evenly h-full min-h-auto overflow-y-scroll md:pr-[17px] w-full overflow-x-hidden">
      {children}
    </div>
  );
};

export default Layout;
