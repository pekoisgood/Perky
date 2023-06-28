"use client";
import React, { useEffect } from "react";
import { auth } from "@/utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useAppDispatch } from "@/redux/hooks";
import { logIn } from "@/redux/slice/authSlice";

// type User = {
//   id: string;
//   name: string;
//   avatar: string;
// };

export const Auth = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const checkAuthStatus = async () => {
      onAuthStateChanged(auth, (user) => {
        if (user && user.displayName && user.photoURL) {
          dispatch(
            logIn({
              id: user.uid,
              name: user.displayName,
              avatar: user.photoURL,
            })
          );
        }
      });
    };
    checkAuthStatus();
  }, []);

  return <></>;
};
