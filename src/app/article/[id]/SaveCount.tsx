"use client";

import { useState, useEffect } from "react";
import { db } from "@/utils/firebase";
import { DocumentData, doc, onSnapshot } from "firebase/firestore";

type Props = {
  articleId: string;
};

const SaveCount = ({ articleId }: Props) => {
  const [count, setCount] = useState<number>(0);
  console.log(count);

  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, "articles", articleId),
      (doc: DocumentData) => {
        setCount(doc.data().savedCount ?? 0);
      }
    );

    return () => {
      unsub();
    };
  }, []);
  return <p className="text-[13px] sm:text-[16px]">收藏數：{count}</p>;
};

export default SaveCount;
