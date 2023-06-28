"use client";
import React, { useEffect } from "react";
import { db } from "@/utils/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  DocumentData,
  orderBy,
} from "firebase/firestore";

const Page = () => {
  useEffect(() => {
    async function test() {
      const ref = collection(db, "articles");
      const q = query(
        ref,
        where("category", "==", "Android"),
        orderBy("createdAt", "desc")
      );
      const result = await getDocs(q);
      let data: DocumentData[] = [];

      result.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
    }
    test();
  }, []);
  return <div>Page</div>;
};

export default Page;
