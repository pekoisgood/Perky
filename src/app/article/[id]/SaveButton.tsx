"use client";
import { db } from "@/utils/firebase";
import {
  doc,
  increment,
  serverTimestamp,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";

type Prop = {
  articleId: string;
};

const SaveButton = ({ articleId }: Prop) => {
  const [isSaved, setIsSaved] = useState<boolean | null>(null);

  const handleSaveArticle = async () => {
    if (isSaved) return;

    await setDoc(
      doc(
        db,
        "users",
        "bGmbmzaDDaO6lbnInODlaCfb4V63",
        "savedArticles",
        articleId
      ),
      {
        articleId: articleId,
        createdAt: serverTimestamp(),
      }
    );
    await updateDoc(doc(db, "articles", articleId), {
      savedCount: increment(1),
    });

    setIsSaved(true);
  };

  const handleUnSaveArticle = async () => {
    await deleteDoc(
      doc(
        db,
        "users",
        "bGmbmzaDDaO6lbnInODlaCfb4V63",
        "savedArticles",
        articleId
      )
    );
    await updateDoc(doc(db, "articles", articleId), {
      savedCount: increment(-1),
    });

    setIsSaved(false);
  };

  useEffect(() => {
    const checkSavedArticle = async () => {
      const getArticle = await getDoc(
        doc(
          db,
          "users",
          "bGmbmzaDDaO6lbnInODlaCfb4V63",
          "savedArticles",
          articleId
        )
      );
      const isSaved = getArticle.data();
      if (isSaved) {
        setIsSaved(true);
      } else {
        setIsSaved(false);
      }
    };
    checkSavedArticle();
  }, []);

  if (isSaved === null) return <></>;

  return (
    <>
      {isSaved ? (
        <button
          className="absolute top-[50%] right-[20px] translate-y-[-50%]"
          onClick={handleUnSaveArticle}
        >
          取消收藏
        </button>
      ) : (
        <button
          className="absolute top-[50%] right-[20px] translate-y-[-50%]"
          onClick={handleSaveArticle}
        >
          + 收藏
        </button>
      )}
    </>
  );
};

export default SaveButton;
