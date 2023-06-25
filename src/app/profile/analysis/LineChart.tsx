"use client";
import React from "react";
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
import { getDayPerMonth } from "../bookClub/Calender";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

const Page = ({
  articleCreatedAtRecord,
  bookClubTimeRecord,
}: {
  articleCreatedAtRecord: Date[];
  bookClubTimeRecord: Date[];
}) => {
  const today = new Date();
  const weekAgo: Date = new Date(today.setDate(today.getDate() - 6));

  function filterWeeklyRecord(record: Date[]) {
    return record.filter((time) => time > weekAgo);
  }

  const filteredWeeklyArticleRecord = filterWeeklyRecord(
    articleCreatedAtRecord
  );
  const filteredWeeklyBookClubRecord = filterWeeklyRecord(bookClubTimeRecord);

  function getDateLabel() {
    let dateLabels = [];
    let month = weekAgo.getMonth() + 1;
    let date = weekAgo.getDate();
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
  }

  const labels = getDateLabel();

  function caculateCountPerDay(filteredRecord: Date[]) {
    let dataSet = [];
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
  }

  const data = {
    labels,
    datasets: [
      {
        label: "讀書會參加紀錄",
        data: caculateCountPerDay(filteredWeeklyBookClubRecord),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        tension: 0.1,
      },
      {
        label: "發文紀錄",
        data: caculateCountPerDay(filteredWeeklyArticleRecord),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        tension: 0.1,
      },
    ],
  };

  return (
    <div>
      <Line options={options} data={data} width={500} height={400} />
    </div>
  );
};

export default Page;
