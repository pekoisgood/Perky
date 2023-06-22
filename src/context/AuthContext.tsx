"use client";
import React, { createContext, useEffect, useState } from "react";
import { auth } from "@/utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useAppDispatch } from "@/redux/hooks";
import { login } from "@/redux/authSlice";

export const AuthContext = createContext({
  isLogin: false,
});

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isLogin, setIsLogin] = useState(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const checkAuthStatus = async () => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const name = user.displayName;
          const avatar = user.photoURL;
          const uid = user.uid;
          dispatch(login({ name, avatar, uid }));

          setIsLogin(true);
        } else {
          console.log("user not log in");
        }
      });
    };
    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ isLogin }}>{children}</AuthContext.Provider>
  );
};
