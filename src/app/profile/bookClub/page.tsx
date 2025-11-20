"use client";

import Link from "next/link";

import { useAppSelector } from "@/redux/hooks";
import Calender from "@/components/Date/Calender";

import BookClubList from "./BookClubList";

const Page = () => {
  const date = useAppSelector((state) => state.calender.value);

  const renderAddBookClubBtn = () => {
    return (
      <Link
        href="/profile/bookClub/createBookClub"
        className="group absolute right-0 top-[50px] h-[39px] w-[78px] rounded-md bg-[#245953] hover:cursor-pointer lg:top-[4px] "
      >
        <div className="relative z-10 h-[39px] w-[90px]">
          <div
            className={`before:content-[ ] relative z-20 flex 
h-full items-center gap-[1px] px-[3px] py-1 before:absolute before:left-[-2px] before:top-0 before:block before:h-[39px] 
before:w-[80px] before:rounded-md before:border-2 before:border-black before:bg-[#245953] 
before:hover:left-[-7px] before:hover:top-[3px] before:hover:h-[36px] before:hover:skew-x-12 group-hover:duration-100`}
          >
            <span className="relative inline-block text-[12px] leading-[31px] text-white group-hover:left-[-6px] group-hover:duration-100">
              New Club +
            </span>
          </div>
          <div className="absolute left-[-2px] top-[-4px] z-10 h-[9px] w-[20px] rounded-[40%_40%_0_0/10px_10px_0_0] border-l-2 border-t-2 border-black bg-[#245953]" />
        </div>
      </Link>
    );
  };

  return (
    <div className="relative mx-5 mt-[20px] w-full md:mx-0">
      <div className="sticky top-[20px] z-10 w-full text-center">
        <h1 className="mx-auto mb-[60px] w-fit rounded-full bg-white/60 px-5 text-[28px] font-bold tracking-[4px] lg:mb-[30px]">
          Book Club
        </h1>
      </div>
      <div className="mx-auto flex h-[89%] w-full max-w-[1200px] flex-col items-center justify-start gap-10 sm:flex-row sm:items-start sm:pl-5">
        <Calender />
        <div className="flex h-[75%] w-full flex-col items-center sm:items-start">
          <p className="w-fit text-[18px] font-semibold md:text-[20px]">
            Book Club Date : {date.year} / {date.month} / {date.date}
          </p>
          {renderAddBookClubBtn()}
          <BookClubList />
        </div>
      </div>
    </div>
  );
};

export default Page;
