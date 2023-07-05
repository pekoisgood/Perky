"use client";

import { AuthContext } from "@/context/AuthContext";
import { redirect } from "next/navigation";
import { useContext, useEffect } from "react";

const Auth = () => {
  const { isLogin } = useContext(AuthContext);

  useEffect(() => {
    if (!isLogin) {
      redirect("/auth");
    }
  }, []);
  return <></>;
};

export default Auth;
