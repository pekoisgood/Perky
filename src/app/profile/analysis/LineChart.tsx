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

import { getDayPerMonth } from "@/components/Date/Calender";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setAnalysis } from "@/redux/slice/analysisSlice";
import { BookClubInfo, Article } from "@/utils/types/types";
import { calculateCountPerDay } from "@/utils/date/dateFc";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);
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

const today = new Date();
const weekAgo: Date = new Date(today.setDate(today.getDate() - 6));

const getDateLabel = () => {
  const dateLabels = [];
  let month = weekAgo.getMonth() + 1;
  let date = weekAgo.getDate() - 1;
  for (let i = 0; i < 7; i++) {
    const lastDayOfMonth = getDayPerMonth(
      weekAgo.getMonth() + 1,
      weekAgo.getFullYear(),
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

const Page = ({ width, height }: { width?: string; height?: string }) => {
  const user = useAppSelector((state) => state.auth.value);

  const [articleRecordCreatedTime, setArticleRecordCreatedTime] = useState([]);
  const [bookClubRecordCreatedTime, setBookClubRecordCreatedTime] = useState(
    [],
  );

  const dispatch = useAppDispatch();

  const filterWeeklyRecord = (record: Date[]) => {
    return record.filter((time) => time > weekAgo);
  };

  const filteredWeeklyArticleRecord = filterWeeklyRecord(
    articleRecordCreatedTime,
  );
  const filteredWeeklyBookClubRecord = filterWeeklyRecord(
    bookClubRecordCreatedTime,
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Book Club",
        data: calculateCountPerDay(labels, filteredWeeklyBookClubRecord),
        borderColor: "#FFA41B",
        backgroundColor: "#FFA41B",
        tension: 0.1,
      },
      {
        label: "Article Post",
        data: calculateCountPerDay(labels, filteredWeeklyArticleRecord),
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
          `/api/analysis/article?id=${user.id}`,
        );
        const articleRecord = await articleRecordReq.json();
        const articleRecordCreatedTime = articleRecord.map(
          (article: Article) => new Date(article.createdAt.seconds * 1000),
        );
        setArticleRecordCreatedTime(articleRecordCreatedTime);

        const bookClubRecordReq = await fetch(
          `/api/analysis/bookClub?id=${user.id}`,
        );
        const bookClubRecord = await bookClubRecordReq.json();
        const bookClubRecordCreatedTime = bookClubRecord.map(
          (bookClub: BookClubInfo) => new Date(bookClub.time.seconds * 1000),
        );
        setBookClubRecordCreatedTime(bookClubRecordCreatedTime);

        dispatch(
          setAnalysis({
            bookClubs: bookClubRecord,
            records: articleRecord,
          }),
        );
      } catch (error) {
        return;
      }
    };

    if (!user.id) return;
    getRecord();
  }, [user.id]);

  return (
    <div
      className={`${width ? width : "w-full"} ${
        height ? height : "h-[auto]"
      } relative flex max-w-[600px] flex-col items-center justify-center`}
    >
      <Line options={options} data={data} width={300} height={200} />
    </div>
  );
};

export default Page;
