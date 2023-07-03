"use client";
import { AuthContext } from "@/context/AuthContext";
import LineChart from "./LineChart";
import { Article, BookClub } from "@/utils/firebase";
import { useContext, useEffect, useState } from "react";

const Page = () => {
  const { user } = useContext(AuthContext);
  const [articleRecourdCreatedTime, setArticleRecourdCreatedTime] = useState(
    []
  );
  const [bookClubRecordCreatedTime, setBookClubRecordCreatedTime] = useState(
    []
  );

  useEffect(() => {
    const getRecord = async () => {
      try {
        const articleRecordReq = await fetch(
          `/api/analysis/article?id=${user.id}`
        );
        const articleRecord = await articleRecordReq.json();
        const articleRecourdCreatedTime = articleRecord.map(
          (article: Article) => new Date(article.createdAt.seconds * 1000)
        );
        setArticleRecourdCreatedTime(articleRecourdCreatedTime);

        const bookClubRecordReq = await fetch(
          `/api/analysis/bookClub?id=${user.id}`
        );
        const bookClubRecord = await bookClubRecordReq.json();
        const bookClubRecordCreatedTime = bookClubRecord.map(
          (bookClub: BookClub) => new Date(bookClub.time.seconds * 1000)
        );
        setBookClubRecordCreatedTime(bookClubRecordCreatedTime);
      } catch (error) {
        console.log(error);
      }
    };

    if (!user.id) return;
    getRecord();
  }, [user.id]);

  return (
    <div className="h-full max-w-[600px] mx-auto">
      <h1 className="w-fit mx-auto font-bold text-[25px] tracking-[2px] indent-[2px] mb-[20px]">
        學習紀錄
      </h1>
      <LineChart
        articleCreatedAtRecord={articleRecourdCreatedTime}
        bookClubTimeRecord={bookClubRecordCreatedTime}
      />
      <div className="flex flex-col gap-3 pt-[20px] w-fit mx-auto text-center">
        <p>本週發文總次數 : {articleRecourdCreatedTime.length}</p>
        <p>本週讀書會參加總次數 : {bookClubRecordCreatedTime.length}</p>
      </div>
    </div>
  );
};

export default Page;
