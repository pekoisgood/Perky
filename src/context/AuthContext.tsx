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
    console.log("=========this is authContext...==========");
    console.log("login status: ", isLogin);
    console.log("user state: ", user);

    const checkAuthStatus = async () => {
      onAuthStateChanged(auth, async (user) => {
        console.log("check: ", user?.uid);

        if (!user) {
          console.log("user not login!!");
          setIsLogin(false);
          return;
        }

        const userRef = doc(db, "users", user.uid);
        const result: DocumentData = await getDoc(userRef);
        console.log("get user info", result.data());

        // if (user.email) {
        setUser({
          email: user.email ?? "",
          id: user.uid,
          name: result.data().name ?? user.displayName ?? user.email,
          avatar: result.data().avatar ?? "",
        });
        // }

        setIsLogin(true);
      });
    };

    checkAuthStatus();
  }, [user.id]);

  const logIn = async () => {
    const result = await signInWithGoogle();

    if (!result) return;
    // console.log("google login: ", user.id);
    // console.log(result.user.uid);

    const userRef = doc(db, "users", result.user.uid);
    const userInfo: DocumentData = await getDoc(userRef);
    // 是因為70 行 user.id 一直拿不到拉幹

    console.log(userInfo.data());

    setUser({
      email: userInfo.data().email ?? result.user.email,
      id: result.user.uid,
      name: userInfo.data().name ?? result.user.displayName,
      avatar: userInfo.data().avatar ?? result.user.photoURL,
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
