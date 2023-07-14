"use client";
import React, { createContext, useEffect, useState } from "react";
import { auth, signInWithGoogle, firebaseSignOut, db } from "@/utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { DocumentData, doc, getDoc } from "firebase/firestore";

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
        console.log("Check user!!!");

        if (user) {
          setUser((prev) => {
            return {
              ...prev,
              id: user.uid,
              email: user.email ?? "",
              avatar: user.photoURL ?? "",
            };
          });
        } else {
          setIsLogin(false);
        }
      });

      if (user.id) {
        const userRef = doc(db, "users", user.id);
        const result: DocumentData = await getDoc(userRef);

        setUser((prev) => {
          return {
            ...prev,
            name: result.data().name,
            avatar: result.data().avatar ?? "",
          };
        });
      }

      setIsLogin(true);
    };

    checkAuthStatus();
  }, [user.id]);

  const logIn = async () => {
    const result = await signInWithGoogle();

    if (!result) return;
    const userRef = doc(db, "users", user.id);
    const userInfo: DocumentData = await getDoc(userRef);

    setUser((prev) => {
      return {
        ...prev,
        name: userInfo.data().name,
        avatar: userInfo.data().avatar ?? "",
      };
    });
    setIsLogin(true);
    router.replace("/profile");
  };

  const logOut = async () => {
    await firebaseSignOut();
    setIsLogin(false);
  };

  return (
    <AuthContext.Provider
      value={{ isLogin, logIn, logOut, user, setIsLogin, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
