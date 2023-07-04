"use client";
import { AuthContext } from "@/context/AuthContext";
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
import React, { useContext, useEffect, useState } from "react";
import { BsBookmark, BsBookmarkHeartFill } from "react-icons/bs";

type Prop = {
  articleId: string;
};

const SaveButton = ({ articleId }: Prop) => {
  const { user } = useContext(AuthContext);
  const [isSaved, setIsSaved] = useState<boolean | null>(null);

  const handleSaveArticle = async () => {
    if (isSaved) {
      await deleteDoc(doc(db, "users", user.id, "savedArticles", articleId));
      await updateDoc(doc(db, "articles", articleId), {
        savedCount: increment(-1),
      });

      setIsSaved(false);
    } else {
      await setDoc(doc(db, "users", user.id, "savedArticles", articleId), {
        articleId: articleId,
        createdAt: serverTimestamp(),
      });
      await updateDoc(doc(db, "articles", articleId), {
        savedCount: increment(1),
      });

      setIsSaved(true);
    }
  };

  useEffect(() => {
    const checkSavedArticle = async () => {
      const getArticle = await getDoc(
        doc(db, "users", user.id, "savedArticles", articleId)
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
      <abbr
        title={`${isSaved ? "已收藏此篇貼文" : "收藏此貼文"}`}
        className="fixed bottom-0 right-[20px] md:absolute md:top-[50%] md:right-0 translate-y-[-50%] hover:cursor-pointer p-2 bg-white/50 rounded-full z-10"
        onClick={handleSaveArticle}
      >
        {isSaved ? (
          <BsBookmarkHeartFill size={30} className="text-[#EB455F]" />
        ) : (
          <BsBookmark size={30} />
        )}
      </abbr>
    </>
  );
};

export default SaveButton;
