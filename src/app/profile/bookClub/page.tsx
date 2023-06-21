"use client";

import { useAppSelector } from "@/redux/hooks";
import Calender from "@/components/Calender";
import BookClubList from "./BookClubList";
import Link from "next/link";

const Page = () => {
  const date = useAppSelector((state) => state.calender.value);

  return (
    <div className="flex flex-col items-center gap-10">
      <Calender />
      <div className="relative w-full">
        <p className="w-fit mx-auto text-[20px] font-semibold">
          讀書會日期：{date.year} / {date.month} / {date.date}
        </p>
        <Link
          href="/profile/bookClub/createBookClub"
          className="absolute top-0 right-0 w-fit bg-slate-300/50 rounded-md px-2 py-1 hover:cursor-pointer"
        >
          新增讀書會
        </Link>
      </div>
      <BookClubList />
    </div>
  );
};

export default Page;
