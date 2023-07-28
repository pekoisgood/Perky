"use client";

import React, { useEffect } from "react";
import Link from "next/link";

import { motion } from "framer-motion";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setRecord } from "@/redux/slice/articleRecordSlice";
import Button from "@/components/Button/Button";
import DashboardArticleSkeleton from "@/components/Skeleton/DashboardArticleSkeleton";
import { Article } from "@/utils/types/types";

const categoryClass = `w-fit bg-[#FFD89C] text-bold font-mono py-1 px-3 text-black
shadow-[-3px_3px] shadow-black rounded-2xl border-2 border-black
`;

const dashBoardTitleClass =
  "font-medium text-[20px] tracking-[2px] mb-[20px] text-center lg:text-start";

export const easeAppearContainer = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
  },
  transition: {
    type: "ease",
    stiffness: 110,
    duration: 1,
  },
};

const ArticleRecord = () => {
  const articleRecords = useAppSelector((state) => state.articleRecord.value);

  const user = useAppSelector((state) => state.auth.value);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getArticleRecord = async () => {
      if (user.id) {
        const req = await fetch(`/api/articleRecord?id=${user.id}`);
        const myArticles: Article[] = await req.json();
        if (!myArticles) {
          return;
        }

        dispatch(setRecord(myArticles));
      }
    };

    getArticleRecord();
  }, [user]);

  return (
    <>
      <h4 className={dashBoardTitleClass}>Recent Article Record</h4>
      {articleRecords === null ? (
        <div className="flex flex-col gap-3 h-[82%]">
          <DashboardArticleSkeleton />
          <DashboardArticleSkeleton />
          <DashboardArticleSkeleton />
          <DashboardArticleSkeleton />
          <DashboardArticleSkeleton />
        </div>
      ) : articleRecords.length > 0 ? (
        <motion.div
          initial="hidden"
          animate="show"
          variants={easeAppearContainer}
          className="flex flex-col gap-3"
        >
          {articleRecords.slice(0, 5).map((article, index) => {
            return (
              <Link
                href={`/article/${article.id}`}
                key={index}
                className="flex md:flex-row flex-col gap-1 border-b-[1px] border-[#eee] py-2"
              >
                <p
                  className={`basis-1/12 h-fit text-[12px] px-[4px] py-[2px] cursor-default ${categoryClass}`}
                >
                  {article.category}
                </p>
                <p className={`text-[14px] lg:16px break-words hyphens-auto`}>
                  {article.title}
                </p>
              </Link>
            );
          })}
        </motion.div>
      ) : (
        <div className="flex flex-col gap-2 justify-center items-center font-medium">
          <p className="text-[#245953]">No post articles...</p>
          <Link href="/article/postArticle">
            <Button>Go to post your first article!!</Button>
          </Link>
        </div>
      )}
    </>
  );
};

export default ArticleRecord;
