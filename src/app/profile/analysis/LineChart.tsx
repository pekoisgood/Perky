"use client";

import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { getDayPerMonth } from "@/components/date/Calender";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setAnalysis } from "@/redux/slice/analysisSlice";

import { BookClubInfo, Article } from "@/utils/types/types";

const options = {
  responsive: true,
  maintainAspectRatio: false,

  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: false,
    },
  },
};

const Page = ({ width, height }: { width?: string; height?: string }) => {
  const user = useAppSelector((state) => state.auth.value);

  const [articleRecourdCreatedTime, setArticleRecourdCreatedTime] = useState(
    []
  );
  const [bookClubRecordCreatedTime, setBookClubRecordCreatedTime] = useState(
    []
  );

  const dispatch = useAppDispatch();

  const today = new Date();
  const weekAgo: Date = new Date(today.setDate(today.getDate() - 6));

  const filterWeeklyRecord = (record: Date[]) => {
    return record.filter((time) => time > weekAgo);
  };

  const filteredWeeklyArticleRecord = filterWeeklyRecord(
    articleRecourdCreatedTime
  );
  const filteredWeeklyBookClubRecord = filterWeeklyRecord(
    bookClubRecordCreatedTime
  );

  const getDateLabel = () => {
    const dateLabels = [];
    let month = weekAgo.getMonth() + 1;
    let date = weekAgo.getDate() - 1;
    for (let i = 0; i < 7; i++) {
      const lastDayOfMonth = getDayPerMonth(
        weekAgo.getMonth() + 1,
        weekAgo.getFullYear()
      );
      date += 1;
      if (date > lastDayOfMonth) {
        month += 1;
        date = 1;
      }
      dateLabels.push(`${month}/${date}`);
    }
    return dateLabels;
  };

  const labels = getDateLabel();

  const caculateCountPerDay = (filteredRecord: Date[]) => {
    const dataSet = [];
    for (let i = 0; i < labels.length; i++) {
      const labelDay = labels[i];
      let count = 0;
      for (let j = 0; j < filteredRecord.length; j++) {
        const recordMon = filteredRecord[j].getMonth() + 1;
        const recordDate = filteredRecord[j].getDate();
        const recordDay = `${recordMon}/${recordDate}`;

        if (labelDay == recordDay) {
          count += 1;
        }
      }

      dataSet.push(count);
    }
    return dataSet;
  };

  const data = {
    labels,
    datasets: [
      {
        label: "Book Club",
        data: caculateCountPerDay(filteredWeeklyBookClubRecord),
        borderColor: "#FFA41B",
        backgroundColor: "#FFA41B",
        tension: 0.1,
      },
      {
        label: "Article Post",
        data: caculateCountPerDay(filteredWeeklyArticleRecord),
        borderColor: "#525FE1",
        backgroundColor: "#525FE1",
        tension: 0.1,
      },
    ],
  };

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
          (bookClub: BookClubInfo) => new Date(bookClub.time.seconds * 1000)
        );
        setBookClubRecordCreatedTime(bookClubRecordCreatedTime);

        dispatch(
          setAnalysis({
            bookClubs: bookClubRecord,
            records: articleRecord,
          })
        );
      } catch (error) {
        console.log(error);
      }
    };

    if (!user.id) return;
    getRecord();
  }, [user.id]);

  return (
    <div
      className={`${width ? width : "w-full"} ${
        height ? height : "h-[auto]"
      } relative max-w-[600px] flex flex-col items-center justify-center`}
    >
      <Line options={options} data={data} width={300} height={200} />
    </div>
  );
};

export default Page;
