"use client";
import { AuthContext } from "@/context/AuthContext";
import { db } from "@/utils/firebase";
import {
  doc,
  serverTimestamp,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { BsBookmark, BsBookmarkHeartFill } from "react-icons/bs";
import Warning from "../../../components/warning/Warning";
import Link from "next/link";
import Button from "@/components/button/Button";

type Prop = {
  articleId: string;
  count: number;
};

const SaveButton = ({ articleId, count }: Prop) => {
  const { user, isLogin } = useContext(AuthContext);
  const [isSaved, setIsSaved] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showWarning, setShowWarning] = useState(false);

  const handleSaveArticle = async () => {
    if (!isLogin) {
      setShowWarning(true);
      return;
    }

    const articleSavedCountRef = doc(db, "articles", articleId);

    if (isSaved && articleId) {
      await deleteDoc(doc(db, "users", user.id, "savedArticles", articleId));
      console.log("ccc", count);

      await updateDoc(articleSavedCountRef, {
        savedCount: count,
      });

      setIsSaved(false);
    } else {
      await setDoc(doc(db, "users", user.id, "savedArticles", articleId), {
        articleId: articleId,
        createdAt: serverTimestamp(),
      });
      await updateDoc(articleSavedCountRef, {
        savedCount: count + 1,
      });

      setIsSaved(true);
    }
  };

  useEffect(() => {
    if (isLogin === null) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [isLogin]);

  useEffect(() => {
    const checkSavedArticle = async () => {
      const getArticle = await getDoc(
        // user.id 可能還沒拿到...
        doc(db, "users", user.id, "savedArticles", articleId)
      );
      const isSaved = getArticle.data();
      if (isSaved) {
        setIsSaved(true);
      } else {
        setIsSaved(false);
      }
    };
    if (isLoading) return;
    checkSavedArticle();
  }, [user.id, articleId, isLoading]);

  return (
    <>
      <p
        className={`fixed bottom-0 right-[20px] md:absolte md:top-0 md:right-0 h-fit w-fit p-2 bg-white/50 rounded-full z-10
        hover:cursor-pointer focus:scale-95`}
        onClick={handleSaveArticle}
      >
        {!isLoading ? (
          isSaved ? (
            <BsBookmarkHeartFill size={30} className="text-[#EB455F]" />
          ) : (
            <BsBookmark size={30} />
          )
        ) : (
          <BsBookmark size={30} />
        )}
      </p>
      {showWarning && (
        <Warning time={0} customCloseButton={true}>
          <div className="flex flex-col gap-2 items-center justify-center">
            <p
              className="absolute top-0 right-[10px] text-black hover:cursor-pointer"
              onClick={() => setShowWarning(false)}
            >
              x
            </p>
            <p>尚未登入</p>
            <Link href="/auth">
              <Button>點我去登入會員！</Button>
            </Link>
          </div>
        </Warning>
      )}
    </>
  );
};

export default SaveButton;
