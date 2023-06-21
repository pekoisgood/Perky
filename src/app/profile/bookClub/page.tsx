"use client";
import { useAppSelector } from "@/redux/hooks";
import Calender from "./Calender";
import BookClubList from "./BookClubList";

const Page = () => {
  const date = useAppSelector((state) => state.calender.value);

  return (
    <div className="flex flex-col items-center gap-10">
      <Calender />
      <p className="w-fit mx-auto mt-[30px] text-[20px] font-semibold">
        讀書會日期：{date.year} / {date.month} / {date.date}
      </p>
      <BookClubList />
    </div>
  );
};

export default Page;
