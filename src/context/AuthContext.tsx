"use client";
import React, { createContext, useEffect, useState } from "react";
import { auth, signInWithGoogle, firebaseSignOut } from "@/utils/firebase";
import { onAuthStateChanged } from "firebase/auth";

type User = {
  id: string;
  name: string;
  avatar: string;
};

export const AuthContext = createContext({
  isLogin: false,
  logIn: () => {},
  logOut: () => {},
  user: {
    name: "",
    avatar: "",
    id: "",
  },
});

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState<User>({ name: "", id: "", avatar: "" });

  useEffect(() => {
    const checkAuthStatus = async () => {
      onAuthStateChanged(auth, (user) => {
        if (user && user.displayName && user.photoURL) {
          setUser({
            name: user.displayName,
            id: user.uid,
            avatar: user.photoURL,
          });
          setIsLogin(true);
        } else {
          setIsLogin(false);
        }
      });
    };
    checkAuthStatus();
  }, []);

  const logIn = async () => {
    const result = await signInWithGoogle();
    if (!result) return;
    setIsLogin(true);
  };

  const logOut = async () => {
    await firebaseSignOut();
    setIsLogin(false);
  };

  return (
    <AuthContext.Provider value={{ isLogin, logIn, logOut, user }}>
      {children}
    </AuthContext.Provider>
  );
};
