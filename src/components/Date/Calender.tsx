"use client";

import { motion } from "framer-motion";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  hadlePrevMonth,
  handleNexMonth,
  handleSelectDate,
} from "@/redux/slice/calenderSlice";
import { useCallback, useEffect, useState } from "react";
import { and, collection, getDocs, or, query, where } from "firebase/firestore";
import { nextDate } from "@/utils/date/dateFc";
import { BookClubInfo } from "@/utils/types/types";
import { db } from "@/utils/firebase/firebase";

export const getDayPerMonth = (m: number, y: number) => {
  const monthesBeforeJuly = m % 2 === 0 && m < 7;
  const monthesAfterAugust = m > 8 && m % 2 !== 0;

  if (m === 2 && y % 4 === 0) {
    return 29;
  } else if (m === 2) {
    return 28;
  } else if (m === 8) {
    return 31;
  } else if (monthesBeforeJuly || monthesAfterAugust) {
    return 30;
  } else {
    return 31;
  }
};

const containerVariant = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    duration: 1,
    stiffness: 120,
  },
  transition: {
    type: "ease",
  },
};

const monthData = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const week = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

const Calender = () => {
  const dispatch = useAppDispatch();
  const date = useAppSelector((state) => state.calender.value);
  const user = useAppSelector((state) => state.auth.value);
  // console.log(date);

  const [bookClubs, setBookClubs] = useState<{ time: number }[]>([]);

  const getDate = (m: number, y: number) => {
    const arr = [];
    const prefixDate = new Date(`${m} 01, ${y}`).getDay();
    const dayPerMon = getDayPerMonth(m, y);

    for (let i = 0; i < prefixDate; i++) {
      arr.push("");
    }
    for (let i = 1; i <= dayPerMon; i++) {
      arr.push(i);
    }
    return arr;
  };

  const getBookClubList = async () => {
    setBookClubs([]);
    const year = date.year;
    const month = date.month;
    // const day = date.date;
    const dateThisMonth = new Date(`${year}-${month}`);
    const dateNextMonth = nextDate(year, month, null);

    const bookClubRef = query(
      collection(db, "bookClubs"),
      and(
        where("time", ">=", dateThisMonth),
        where("time", "<", dateNextMonth),

        or(
          where("host", "==", user.id),
          where("guest", "array-contains", user.id),
        ),
      ),
    );

    const result = await getDocs(bookClubRef);

    if (result.empty) {
      setBookClubs([]);
      return;
    }
    const bookClubs: { time: number }[] = [];

    result.forEach((doc) => {
      bookClubs.push({
        time: doc.data().time.toDate().getDate(),
      });
    });

    setBookClubs(bookClubs);
  };

  // render

  const renderPrevBtn = () => {
    return (
      <p
        className="mr-auto rounded-xl bg-[#245953] px-2 py-1 text-[16px] text-white hover:cursor-pointer hover:bg-[#F7D060] hover:text-[#245953] lg:text-[20px]"
        onClick={() => {
          dispatch(hadlePrevMonth());
        }}
      >
        prev
      </p>
    );
  };

  const renderNextBtn = () => {
    return (
      <p
        className="ml-auto rounded-xl bg-[#245953] px-2 py-1 text-[16px] text-white hover:cursor-pointer hover:bg-[#F7D060] hover:text-[#245953] lg:text-[20px]"
        onClick={() => {
          dispatch(handleNexMonth());
        }}
      >
        next
      </p>
    );
  };

  const renderWeekTitle = () => {
    return (
      <div className="grid grid-cols-7">
        {week.map((d, index) => (
          <p
            key={index}
            className="justify-center text-center text-[16px] font-bold lg:text-[20px]"
          >
            {d}
          </p>
        ))}
      </div>
    );
  };

  const renderDate = () => {
    return (
      <div className="mx-auto mt-2 grid grid-cols-7 items-center justify-items-center text-[20px]">
        {getDate(date.month, date.year).map((d, index) => {
          // console.log(bookClubs.some((bookClub) => d === bookClub.time));
          console.log(bookClubs);

          return (
            <div
              key={index}
              className="mt-2 flex items-center justify-center font-medium"
            >
              <p
                data-value={Number(d)}
                className={`
            h-[35px] w-[35px] rounded-full text-center leading-[36px]  hover:cursor-pointer
            ${bookClubs.some((bookClub) => bookClub.time === d) && `after:text-bold after:text-red-500 after:content-['*']`}
            ${
              d
                ? date.date && date.date === d
                  ? "bg-[#FF6D60] text-white"
                  : "hover:bg-[#FF6D60] hover:text-white "
                : ""
            }`}
                onClick={(e) => {
                  const value = (e.target as HTMLElement).getAttribute(
                    "data-value",
                  );
                  if (!value) return;
                  dispatch(
                    handleSelectDate({ type: "UPDATE", value: Number(value) }),
                  );
                }}
              >
                {d}
              </p>
            </div>
          );
        })}
      </div>
    );
  };

  useEffect(() => {
    getBookClubList();
  }, [date.month]);

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={containerVariant}
      className="w-fit"
    >
      <div className="w-[300px] rounded-2xl border-2 border-solid border-[#245953] bg-white p-[10px] shadow-[-5px_10px] shadow-[#245953] lg:w-[500px] lg:px-6 lg:py-10">
        <div className="mb-5 flex items-center justify-center gap-3">
          {renderPrevBtn()}
          <p className="text-[20px] font-bold lg:text-[25px]">
            {monthData[date.month - 1]}
          </p>
          <p className="text-[20px] font-bold lg:text-[25px]">{date.year}</p>
          {renderNextBtn()}
        </div>
        {renderWeekTitle()}
        {renderDate()}
        <p
          className="ml-auto w-fit text-[#245953] hover:cursor-pointer"
          onClick={() => dispatch(handleSelectDate({ type: "TODAY" }))}
        >
          Today
        </p>
      </div>
    </motion.div>
  );
};

export default Calender;
