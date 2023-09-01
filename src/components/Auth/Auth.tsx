"use client";

import React, { useEffect, useState } from "react";
import { redirect } from "next/navigation";

import { onAuthStateChanged } from "firebase/auth";
import { DocumentData, doc, getDoc } from "firebase/firestore";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setIsLogin, setUser } from "@/redux/slice/authSlice";
import { auth, db } from "@/utils/firebase/firebase";

const Auth = ({
  children,
  isAuthNeeded = false,
}: {
  children: React.ReactNode;
  isAuthNeeded?: boolean;
}) => {
  const isLogin = useAppSelector((state) => state.auth.value.isLogin);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  console.log("isLoading", isLoading);
  console.log("isLogin", isLogin);

  useEffect(() => {
    if (isLogin === null) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [isLogin]);

  useEffect(() => {
    const checkAuthStatus = async () => {
      onAuthStateChanged(auth, async (user) => {
        if (!user) {
          dispatch(setIsLogin(false));
          return;
        }

        const userRef = doc(db, "users", user.uid);
        const result: DocumentData = await getDoc(userRef);
        dispatch(
          setUser({
            email: user.email ?? "",
            id: user.uid,
            name: result.data().name ?? user.displayName ?? user.email,
            avatar: result.data().avatar ?? "",
          })
        );
      });
    };

    if (isAuthNeeded) {
      if (isLoading) return;
      if (isLogin === false) {
        redirect("/auth");
      }
    }

    console.log("re-run!");

    checkAuthStatus();
  }, [isLoading, isLogin]);
  return <>{children}</>;
};

export default Auth;
