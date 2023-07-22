"use client";
import { store } from "./store";
import { Provider } from "react-redux";
import React, { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/utils/firebase/firebase";
import { DocumentData, doc, getDoc } from "firebase/firestore";

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider store={store}>{children}</Provider>;
}
