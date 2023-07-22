"use client";
import { store } from "./store";
import { Provider } from "react-redux";
import React, { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/utils/firebase/firebase";
import { DocumentData, doc, getDoc } from "firebase/firestore";
import { useAppDispatch } from "./hooks";
import { setIsLogin, setUser } from "./slice/authSlice";

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // const router = useRouter();
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

  return <Provider store={store}>{children}</Provider>;
}
