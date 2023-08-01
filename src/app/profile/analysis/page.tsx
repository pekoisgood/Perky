"use client";

import { useAppSelector } from "@/redux/hooks";
import LineChart from "./LineChart";

const descClass = `text-[12px] sm:text-[14px] md:text-[16px] font-medium list-[circle]`;

const Page = () => {
  const records = useAppSelector((state) => state.analysis.value);

  return (
    <div className="mt-[20px] px-[10px] sm:px-[15px] w-full mx-auto relative">
      <div className="sticky top-[20px] w-full text-center z-10">
        <h1 className="bg-white/60 w-fit mx-auto text-[28px] font-bold tracking-[4px] rounded-full px-5 mb-[60px] lg:mb-[30px]">
          Analysis
        </h1>
      </div>
      <div className="flex flex-col items-center h-full max-h-[70%] mt-[20px]">
        <LineChart height={"h-full"} width={"w-full"} />
      </div>
      <ul className="flex flex-col gap-3 pt-[20px] w-fit mx-auto">
        <li className={descClass}>
          Total posts this week : {records?.records.length}
        </li>
        <li className={descClass}>
          Total book club joined this week : {records?.bookClubs.length}
        </li>
      </ul>
    </div>
  );
};

export default Page;
