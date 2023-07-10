"use client";

import { useAppSelector } from "@/redux/hooks";
import React, { useEffect, useContext } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { Articles, setRecord } from "@/redux/slice/articleRecordSlice";
import { AuthContext } from "@/context/AuthContext";
import { dashBoardTitleClass } from "../page";
import { categoryClass } from "@/app/page";
import Link from "next/link";
import Button from "@/components/button/Button";

const ArticleRecord = () => {
  const articleRecords = useAppSelector((state) => state.articleRecord.value);
  const { user } = useContext(AuthContext);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const getArticleRecord = async () => {
      if (user.id) {
        const req = await fetch(`/api/articleRecord?id=${user.id}`);
        const myArticles: Articles[] = await req.json();
        if (!myArticles) {
          return;
        }

        dispatch(setRecord(myArticles));
      }
    };

    getArticleRecord();
  }, [user.id]);
  return (
    <>
      <h4 className={dashBoardTitleClass}>Article Record</h4>
      {articleRecords === null ? (
        <p>Loading...</p>
      ) : articleRecords.length > 0 ? (
        <div className="flex flex-col gap-3">
          {articleRecords.slice(0, 5).map((article, index) => {
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
                <p className={`text-[14px] lg:16px`}>{article.title}</p>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center text-[#245953]">
          <p>No post articles...</p>
          <Link href="/article/postArticle">
            <Button>Go to post your first article!!</Button>
          </Link>
        </div>
      )}
    </>
  );
};

export default ArticleRecord;
