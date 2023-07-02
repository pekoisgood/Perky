import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex items-center justify-evenly h-[90%] min-h-auto overflow-y-scroll pr-[17px] w-full overflow-x-hidden">
      {children}
    </div>
  );
};

export default Layout;
