"use client";

import { AuthContext } from "@/context/AuthContext";
import { redirect } from "next/navigation";
import { useContext, useEffect, useState } from "react";

const Auth = () => {
  const { isLogin } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  console.log(isLogin);

  useEffect(() => {
    if (isLogin === null) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [isLogin]);

  useEffect(() => {
    if (isLoading) return;
    if (isLogin === false) {
      // console.log("redirect to auth");

      redirect("/auth");
    }
  }, [isLoading, isLogin]);
  return <></>;
};

export default Auth;
