"use client";

import { useAppDispatch } from "@/redux/hooks";
import { setIsLogin, setUser } from "@/redux/slice/authSlice";
import { auth, db } from "@/utils/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { DocumentData, doc, getDoc } from "firebase/firestore";
import React, { useEffect } from "react";

const Auth = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();

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

    checkAuthStatus();
  }, [dispatch]);
  return <>{children}</>;
};

export default Auth;
