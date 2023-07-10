"use client";

import { useAppSelector } from "@/redux/hooks";
import React, { useEffect, useContext } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { AuthContext } from "@/context/AuthContext";
import {
  DocumentData,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "@/utils/firebase";
import { setSavedArticle } from "@/redux/slice/savedArticle";
import { SavedArticle } from "./page";
import { dashBoardTitleClass } from "../page";
import { categoryClass } from "@/app/page";
import Link from "next/link";
import Button from "@/components/button/Button";

const ArticleRecord = () => {
  const savedArticles = useAppSelector((state) => state.savedArticle.value);
  const { user } = useContext(AuthContext);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const getArticle = async () => {
      const savedArticles: SavedArticle[] = [];
      const articleIds: string[] = [];
      const q = query(
        collection(db, "users", user.id, "savedArticles"),
        orderBy("createdAt", "desc")
      );
      const result = await getDocs(q);
      result.forEach((doc) => {
        articleIds.push(doc.id);
      });

      // console.log("id: ", articleIds);
      if (!articleIds) return;
      for (let i = 0; i < articleIds.length; i += 1) {
        const res: DocumentData = await getDoc(
          doc(db, "articles", articleIds[i])
        );
        // console.log(articleIds[i]);

        // console.log(res.data());

        savedArticles.push({
          id: res.id,
          authorName: res.data().authorName,
          title: res.data().title,
          content: res.data().content,
          image: res.data().image,
          category: res.data().category,
        });
      }

      console.log("...", savedArticles);

      dispatch(setSavedArticle(savedArticles));
    };

    if (user.id === "") return;
    getArticle();
  }, [user.id]);

  if (savedArticles === null) return <>Loading...</>;

  return (
    <>
      <h4 className={dashBoardTitleClass}>Saved Article</h4>
      {savedArticles.length > 0 ? (
        <div className="flex flex-col gap-3">
          {savedArticles.slice(0, 5).map((article, index) => {
            return (
              <div
                key={index}
                className="flex md:flex-row flex-col gap-1 border-b-[1px] border-[#eee] py-2"
              >
                <p
                  className={`basis-1/12 h-fit text-[12px] px-[4px] py-[2px] cursor-default ${categoryClass}`}
                >
                  {article.category}
                </p>
                <p className={`text-[14px] lg:16px`}>
                  {article.title}
                  <span className="ml-2 text-[12px]">{article.authorName}</span>
                </p>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center">
          <p>No saved articles...</p>
          <Link href="/">
            <Button>Go to find some awesome articles!!</Button>
          </Link>
        </div>
      )}
    </>
  );
};

export default ArticleRecord;
