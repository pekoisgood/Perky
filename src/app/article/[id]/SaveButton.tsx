"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

import {
  doc,
  serverTimestamp,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  increment,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { BsBookmark, BsBookmarkHeartFill } from "react-icons/bs";

import Warning from "@/components/Warning/Warning";
import Button from "@/components/Button/Button";
import { db } from "@/utils/firebase/firebase";
import { useAppSelector } from "@/redux/hooks";

type Prop = {
  articleId: string;
  count: number;
  savedUsers: string[];
};

const SaveButton = ({ articleId, savedUsers }: Prop) => {
  const [isSaved, setIsSaved] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showWarning, setShowWarning] = useState(false);

  const user = useAppSelector((state) => state.auth.value);

  const handleSaveArticle = async () => {
    if (!user.isLogin) {
      setShowWarning(true);
      return;
    }

    const articleSavedCountRef = doc(db, "articles", articleId);

    if (isSaved && articleId) {
      await deleteDoc(doc(db, "users", user.id, "savedArticles", articleId));

      await updateDoc(doc(db, "articles", articleId), {
        savedUsers: arrayRemove({
          userId: user.id,
        }),
      });

      await updateDoc(articleSavedCountRef, {
        savedCount: increment(-1),
      });

      setIsSaved(false);
    } else {
      // add savedArticleId in users collection -> savedArticles subcollection
      await setDoc(doc(db, "users", user.id, "savedArticles", articleId), {
        articleId: articleId,
        createdAt: serverTimestamp(),
      });

      // add user doc in articleId subcollection - "savedUsers"
      await setDoc(doc(db, "articles", articleId, "savedUsers", user.id), {
        userId: user.id,
        createdAt: serverTimestamp(),
      });

      // add savedUser array in articleId doc
      await updateDoc(doc(db, "articles", articleId), {
        savedUsers: arrayUnion(user.id),
      });
      await updateDoc(articleSavedCountRef, {
        savedCount: increment(1),
      });

      setIsSaved(true);
    }
  };

  useEffect(() => {
    if (user.isLogin === null) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [user.isLogin]);

  useEffect(() => {
    const checkSavedArticle = async () => {
      // const getArticle = await getDoc(
      //   doc(db, "users", user.id, "savedArticles", articleId)
      // );
      // const isSaved = getArticle.data();

      const isSaved = savedUsers.find((userId) => userId === user.id);
      if (isSaved) {
        setIsSaved(true);
      } else {
        setIsSaved(false);
      }
    };

    if (isLoading || !user.id) return;

    checkSavedArticle();
  }, [user.id, articleId, isLoading]);

  return (
    <>
      <p
        className={`order-2 fixed bottom-0 right-[20px] h-fit w-fit p-2 bg-white/50 rounded-full z-20
         lg:top-[100px] lg:right-0 lg:sticky lg:self-start
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
        <Warning time={0} customHandleCloseButton={() => setShowWarning(false)}>
          <div className="flex flex-col gap-2 items-center justify-center">
            {/* <p
              className="absolute top-0 right-[10px] text-black hover:cursor-pointer"
              onClick={() => setShowWarning(false)}
            >
              x
            </p> */}
            <p>You need to login to save this aticle...</p>
            <Link href="/auth">
              <Button>Click me to login!</Button>
            </Link>
          </div>
        </Warning>
      )}
    </>
  );
};

export default SaveButton;
