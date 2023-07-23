"use client";

import { useAppSelector } from "@/redux/hooks";
import React, { useEffect } from "react";
import { useAppDispatch } from "@/redux/hooks";
import {
  DocumentData,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "@/utils/firebase/firebase";
import { setSavedArticle } from "@/redux/slice/savedArticle";
import { SavedArticle } from "@/utils/types/types";
import Link from "next/link";
import Button from "@/components/Button/Button";
import DashboardArticleSkeleton from "@/components/Skeleton/DashboardArticleSkeleton";
import { motion } from "framer-motion";
import { easeAppearContainer } from "../articleRecord/ArticleRecord";

const categoryClass = `w-fit bg-[#FFD89C] text-bold font-mono py-1 px-3 text-black
shadow-[-3px_3px] shadow-black rounded-2xl border-2 border-black
`;

const dashBoardTitleClass =
  "font-medium text-[20px] tracking-[2px] mb-[20px] text-center lg:text-start";

const ArticleRecord = () => {
  const savedArticles = useAppSelector((state) => state.savedArticle.value);
  const user = useAppSelector((state) => state.auth.value);
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

      if (!articleIds) return;
      for (let i = 0; i < articleIds.length; i += 1) {
        const res: DocumentData = await getDoc(
          doc(db, "articles", articleIds[i])
        );

        savedArticles.push({
          id: res.id,
          authorName: res.data().authorName,
          title: res.data().title,
          content: res.data().content,
          image: res.data().image,
          category: res.data().category,
        });
      }

      dispatch(setSavedArticle(savedArticles));
    };

    if (user.id === "") return;
    getArticle();
  }, [user]);

  return (
    <>
      <h4 className={dashBoardTitleClass}>Recent Saved Article</h4>
      {savedArticles === null ? (
        <div className="flex flex-col gap-3 h-[82%]">
          <DashboardArticleSkeleton />
          <DashboardArticleSkeleton />
          <DashboardArticleSkeleton />
          <DashboardArticleSkeleton />
          <DashboardArticleSkeleton />
        </div>
      ) : savedArticles.length > 0 ? (
        <motion.div
          initial="hidden"
          animate="show"
          variants={easeAppearContainer}
          className="flex flex-col gap-3"
        >
          {savedArticles.slice(0, 5).map((article, index) => {
            return (
              <Link
                href={`/article/${article.id}`}
                key={index}
                className="w-full flex md:flex-row flex-col gap-1 border-b-[1px] border-[#eee] py-2"
              >
                <p
                  className={`basis-1/12 h-fit text-[12px] px-[4px] py-[2px] cursor-default ${categoryClass}`}
                >
                  {article.category}
                </p>
                <p className={`text-[14px] lg:16px break-words hyphens-auto`}>
                  {article.title}
                  <span className="ml-2 text-[12px] break-words hyphens-auto">
                    {article.authorName}
                  </span>
                </p>
              </Link>
            );
          })}
        </motion.div>
      ) : (
        <div className="flex flex-col gap-2 justify-center items-center font-medium">
          <p className="text-[#245953]">No saved articles...</p>
          <Link href="/">
            <Button>Go to find some awesome articles!!</Button>
          </Link>
        </div>
      )}
    </>
  );
};

export default ArticleRecord;
