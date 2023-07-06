"use client";
import React, { createContext, useEffect, useState } from "react";
import { auth, signInWithGoogle, firebaseSignOut } from "@/utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";

type User = {
  id: string;
  name: string;
  avatar: string;
};

type Auth = {
  isLogin: boolean | null;
  logIn: () => void;
  logOut: () => void;
  user: User;
};

export const AuthContext = createContext<Auth>({
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
  const [isLogin, setIsLogin] = useState<null | boolean>(null);
  const [user, setUser] = useState<User>({ name: "", id: "", avatar: "" });
  const router = useRouter();

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
    router.replace("/profile/analysis");
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
