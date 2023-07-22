"use client";
import React, {
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";
import {
  auth,
  signInWithGoogle,
  firebaseSignOut,
  db,
} from "@/utils/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { DocumentData, doc, getDoc } from "firebase/firestore";

import { User, Auth } from "@/utils/types/types";

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
      onAuthStateChanged(auth, async (user) => {
        if (!user) {
          setIsLogin(false);
          return;
        }

        const userRef = doc(db, "users", user.uid);
        const result: DocumentData = await getDoc(userRef);

        setUser({
          email: user.email ?? "",
          id: user.uid,
          name: result.data().name ?? user.displayName ?? user.email,
          avatar: result.data().avatar ?? "",
        });

        setIsLogin(true);
      });
    };

    checkAuthStatus();
  }, [user.id]);

  const logIn = async () => {
    const result = await signInWithGoogle();

    if (!result) return;

    const userRef = doc(db, "users", result.user.uid);
    const userInfo: DocumentData = await getDoc(userRef);

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
