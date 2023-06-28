"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  hadlePrevMonth,
  handleNexMonth,
  handleSelectDate,
} from "../../../redux/slice/calenderSlice";

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

  const getDayPerMonth = (m: number, y: number) => {
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
    <div className="w-fit mx-auto">
      <div className="border-2 border-solid border-black border-r-10 w-[500px] px-6 py-10 rounded-2xl ">
        <div className="flex gap-3 justify-center mb-5 items-center">
          <p
            className="mr-auto border-[1px] border-slate-400 border-solid p-1 rounded-xl text-sky-500 text-[20px] hover:cursor-pointer hover:bg-slate-100"
            onClick={() => {
              dispatch(hadlePrevMonth());
            }}
          >
            prev
          </p>
          <p className="font-bold text-[25px]">{monthData[date.month - 1]}</p>
          <p className="font-bold text-[25px]">{date.year}</p>
          <p
            className="ml-auto border-[1px] border-slate-400 border-solid p-1 rounded-xl text-sky-500 text-[20px] hover:cursor-pointer hover:bg-slate-100"
            onClick={() => {
              dispatch(handleNexMonth());
            }}
          >
            next
          </p>
        </div>
        <div className="flex justify-between">
          {week.map((d, index) => (
            <p
              key={index}
              className="w-1/7 flex justify-center text-[20px] font-bold"
            >
              {d}
            </p>
          ))}
        </div>
        <div className="grid grid-cols-7 mt-2 items-center mx-auto justify-items-center">
          {getDate(date.month, date.year).map((d, index) => (
            <div
              key={index}
              className="flex justify-center items-center text-[22px] font-medium mt-2"
            >
              <p
                data-value={Number(d)}
                className={
                  d
                    ? date.date && date.date === d
                      ? "border-[1px] border-solid border-slate-400 w-[35px] h-[35px] bg-indigo-100 rounded-full text-center hover:cursor-pointer leading-[30px] p-1 pt-[2px]"
                      : "hover:cursor-pointer hover:bg-indigo-100 w-[35px] h-[35px] rounded-full text-center leading-[30px] p-1 pt-[2px]"
                    : ""
                }
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
    </div>
  );
};

export default Calender;
