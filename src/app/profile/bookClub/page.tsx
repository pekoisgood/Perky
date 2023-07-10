"use client";

import { useAppSelector } from "../../../redux/hooks";
import Calender from "../../../components/date/Calender";
import BookClubList from "./BookClubList";
import Link from "next/link";

const Page = () => {
  const date = useAppSelector((state) => state.calender.value);

  return (
    <div className="relative w-full mt-[20px]">
      <h1 className="sticky top-[20px] right-[50%] translate-x-[50%] bg-white/60 mx-auto w-fit text-[28px] font-bold tracking-[4px] rounded-full px-5 mb-[30px]">
        Book Club
      </h1>
      <div className="flex sm:flex-row flex-col justify-start sm:pl-5 gap-10 h-[89%] w-full max-w-[1200px] mx-auto">
        <Calender />
        <div className="flex flex-col sm:items-start items-center h-[75%] w-full">
          <p className="w-fit text-[18px] md:text-[20px] font-semibold">
            Book Club Date : {date.year} / {date.month} / {date.date}
          </p>
          <Link
            href="/profile/bookClub/createBookClub"
            className="absolute top-[4px] right-0 group w-[78px] h-[39px] bg-[#245953] rounded-md hover:cursor-pointer "
          >
            <div className="relative w-[90px] h-[39px] z-10">
              <div
                className={`flex items-center gap-[1px] h-full relative 
            before:absolute before:block before:top-0 before:left-[-2px] before:content-[ ] before:w-[80px] before:h-[39px] before:bg-[#245953] before:rounded-md 
            px-[3px] py-1 z-20 before:border-2 before:border-black 
            before:hover:skew-x-12 before:hover:h-[36px] before:hover:top-[3px] before:hover:left-[-7px] group-hover:duration-100`}
              >
                <span className="inline-block relative text-[12px] text-white leading-[31px] group-hover:left-[-6px] group-hover:duration-100">
                  New Club +
                </span>
              </div>
              <div className="absolute top-[-4px] left-[-2px] w-[20px] h-[9px] bg-[#245953] rounded-[40%_40%_0_0/10px_10px_0_0] z-10 border-black border-l-2 border-t-2" />
            </div>
          </Link>
          <BookClubList />
        </div>
      </div>
    </div>
  );
};

export default Page;
