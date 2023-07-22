"use client";

import { useAppSelector } from "@/redux/hooks";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

const Auth = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const isLogin = useAppSelector((state) => state.auth.value.isLogin);

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
      redirect("/auth");
    }
  }, [isLoading, isLogin]);
  return <></>;
};

export default Auth;
