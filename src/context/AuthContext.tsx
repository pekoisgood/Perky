"use client";
import React, { createContext, useEffect, useState } from "react";
import { auth, signInWithGoogle, firebaseSignOut } from "@/utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";

type User = {
  id: string;
  name: string;
  avatar: string;
  email: string;
};

// type isLoginState = boolean | null;

type Auth = {
  isLogin: boolean | null;
  logIn: () => void;
  logOut: () => void;
  user: User;
  setUser: any;
  setIsLogin: any;
};

export const AuthContext = createContext<Auth>({
  isLogin: false,
  logIn: () => {},
  logOut: () => {},
  setIsLogin: () => {},
  setUser: () => {},
  user: {
    name: "",
    avatar: "",
    id: "",
    email: "",
  },
});

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isLogin, setIsLogin] = useState<null | boolean>(null);
  const [user, setUser] = useState<User>({
    name: "",
    id: "",
    avatar: "",
    email: "",
  });
  const router = useRouter();

  useEffect(() => {
    const checkAuthStatus = async () => {
      onAuthStateChanged(auth, (user) => {
        if (user && user.displayName && user.photoURL && user.email) {
          setUser({
            name: user.displayName,
            id: user.uid,
            avatar: user.photoURL,
            email: user.email,
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
    // if(method === "GOOGLE"){
    const result = await signInWithGoogle();

    // }eles{

    // }

    if (!result) return;
    setIsLogin(true);
    router.replace("/profile/analysis");
  };

  const logOut = async () => {
    await firebaseSignOut();
    setIsLogin(false);
  };

  // const signInWithEmailAndPassword = async (
  //   email: string,
  //   password: string
  // ) => {
  //   const userInfo = await signInWithEmail(email, password);
  //   console.log(userInfo);
  // };

  return (
    <AuthContext.Provider
      value={{ isLogin, logIn, logOut, user, setIsLogin, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
