"use client";

import { useAppSelector } from "../../../redux/hooks";
import Calender from "../../../components/date/Calender";
import BookClubList from "./BookClubList";
import Link from "next/link";

const Page = () => {
  const date = useAppSelector((state) => state.calender.value);

  return (
    <div className="flex sm:flex-row flex-col items-center justify-start sm:pl-5 gap-10 h-full w-full">
      <Calender />
      <div className="flex flex-col sm:items-start items-center h-[75%] w-full">
        <p className="w-fit text-[18px] md:text-[20px] font-semibold">
          讀書會日期：{date.year} / {date.month} / {date.date}
        </p>
        <Link
          href="/profile/bookClub/createBookClub"
          className="absolute top-[4px] right-0 group w-[78px] h-[35px] bg-[#2B3467] rounded-md hover:cursor-pointer "
        >
          <div className="relative w-[90px] h-[35px]">
            <div className="flex items-center h-full relative before:absolute before:block before:top-0 before:left-[-2px] before:content-[ ] before:w-[80px] before:h-[35px] before:bg-[#333e7a] before:rounded-md px-[6px] py-1 z-20 before:border-2 before:border-black before:hover:skew-x-12 before:hover:h-[32px] before:hover:top-[3px] before:hover:left-[-7px] group-hover:duration-100">
              <span className="inline-block relative z-100 text-[12px] text-white group-hover:left-[-6px] group-hover:duration-100">
                新增讀書會
              </span>
            </div>
            <div className="absolute top-[-4px] left-[-2px] w-[20px] h-[9px] bg-[#2B3467] rounded-[40%_40%_0_0/10px_10px_0_0] z-10 border-black border-l-2 border-t-2" />
          </div>
        </Link>
        <BookClubList />
      </div>
    </div>
  );
};

export default Page;
