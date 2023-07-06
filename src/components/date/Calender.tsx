"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  hadlePrevMonth,
  handleNexMonth,
  handleSelectDate,
} from "../../redux/slice/calenderSlice";
import { motion } from "framer-motion";

export const getDayPerMonth = (m: number, y: number) => {
  if (m === 2 && y % 4 === 0) {
    return 29;
  } else if (m === 2) {
    return 28;
  } else if (m % 2 === 0) {
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

const Calender = () => {
  const dispatch = useAppDispatch();

  const date = useAppSelector((state) => state.calender.value);

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

  const getDate = (m: number, y: number) => {
    let arr = [];
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

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={containerVariant}
      className="w-fit"
    >
      <div className="border-2 border-solid border-[#245953] bg-white w-[300px] lg:w-[500px] p-[10px] lg:px-6 lg:py-10 rounded-2xl shadow-[-5px_10px] shadow-[#245953]">
        <div className="flex gap-3 justify-center mb-5 items-center">
          <p
            className="mr-auto bg-[#245953] py-1 px-2 rounded-xl text-[#F7D060] text-[16px] lg:text-[20px] hover:cursor-pointer hover:bg-[#F7D060] hover:text-[#245953]"
            onClick={() => {
              dispatch(hadlePrevMonth());
            }}
          >
            prev
          </p>
          <p className="font-bold text-[20px] lg:text-[25px]">
            {monthData[date.month - 1]}
          </p>
          <p className="font-bold text-[20px] lg:text-[25px]">{date.year}</p>
          <p
            className="ml-auto bg-[#245953] py-1 px-2 rounded-xl text-[#F7D060] text-[16px] lg:text-[20px] hover:cursor-pointer hover:bg-[#F7D060] hover:text-[#245953]"
            onClick={() => {
              dispatch(handleNexMonth());
            }}
          >
            next
          </p>
        </div>
        <div className="grid grid-cols-7">
          {week.map((d, index) => (
            <p
              key={index}
              className="text-center justify-center text-[16px] lg:text-[20px] font-bold"
            >
              {d}
            </p>
          ))}
        </div>
        <div className="grid grid-cols-7 mt-2 text-[20px] items-center mx-auto justify-items-center">
          {getDate(date.month, date.year).map((d, index) => (
            <div
              key={index}
              className="flex justify-center items-center font-medium mt-2"
            >
              {/*  leading-[30px] p-1 pt-[2px] */}
              <p
                data-value={Number(d)}
                className={`
                  w-[35px] h-[35px] rounded-full text-center leading-[35px]
                  ${
                    d
                      ? date.date && date.date === d
                        ? "text-white bg-[#FF6D60]"
                        : "hover:bg-[#FF6D60] hover:text-white hover:cursor-pointer hover:animate-pulse hover:duration-75"
                      : ""
                  }`}
                onClick={(e) => {
                  const value = (e.target as HTMLElement).getAttribute(
                    "data-value"
                  );
                  if (!value) return;
                  dispatch(handleSelectDate(Number(value)));
                }}
              >
                {d}
              </p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Calender;
