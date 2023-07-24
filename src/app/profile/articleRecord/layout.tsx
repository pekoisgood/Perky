import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-auto h-full overflow-y-scroll px-[10px] sm:px-[15px] w-full overflow-x-hidden">
      {children}
    </div>
  );
};

export default Layout;
