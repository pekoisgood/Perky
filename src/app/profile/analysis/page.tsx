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
    };

    if (!user.id) return;
    getRecord();
  }, [user.id]);

  return (
    <div>
      <h1 className="w-fit mx-auto text-bold text-[25px] mb-2">學習分析</h1>
      <LineChart
        articleCreatedAtRecord={articleRecourdCreatedTime}
        bookClubTimeRecord={bookClubRecordCreatedTime}
      />
    </div>
  );
};

export default Page;
