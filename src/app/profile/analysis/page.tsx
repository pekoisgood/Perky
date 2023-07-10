"use client";
import { useAppSelector } from "@/redux/hooks";
import LineChart from "./LineChart";

const descClass = `text-[20px] font-medium list-[circle]`;

const Page = () => {
  const records = useAppSelector((state) => state.analysis.value);
  console.log(records);

  return (
    <div className="mt-[20px] w-full mx-auto relative">
      <h1 className="sticky top-[20px] right-[43%] translate-x-[50%] bg-white/60 mx-auto w-fit text-[28px] font-bold tracking-[4px] rounded-full px-5 mb-[30px]">
        Analysis
      </h1>
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
