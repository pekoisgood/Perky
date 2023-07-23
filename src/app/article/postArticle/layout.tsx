import Auth from "@/components/Auth/Auth";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <Auth isAuthNeeded={true}>{children}</Auth>;
};

export default Layout;
