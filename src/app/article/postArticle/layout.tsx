import React from "react";
import Auth from "@/components/Auth/Auth";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <Auth isAuthNeeded={true}>{children}</Auth>;
};

export default Layout;
