import React from "react";

const textClass = `w-full rounded-lg h-[30px] bg-slate-100 bg-gradient-to-r from-slate-100 via-slate-300 to-slate-100 bg-[length:400%_400%] animate-skeleton  `;

const TrendingArticleSkeleton = () => {
  return (
    <>
      <div className="relative flex flex-wrap md:justify-between h-[92%] gap-[10px] max-w-[1280px] w-full mx-auto z-100">
        <div className="flex gap-[20px] w-full h-[70%] mt-auto border-b-[1px] border-[#d1d5db] pb-[30px]">
          <div className="object-cover min-w-[50vw] rounded-xl shadow-[-10px_10px] shadow-[#0000003b] bg-slate-200 bg-gradient-to-r from-slate-100 via-slate-300 to-slate-100 bg-[length:400%_400%] animate-skeleton" />
          <div className="flex flex-col gap-[10px] w-full">
            <p className={textClass} />
            <p className={textClass} />
            <p className={textClass} />
            <p className={`${textClass} mt-auto`} />
          </div>
        </div>
        {new Array(4).fill("").map((_, index) => {
          return (
            <div
              key={index}
              className="flex gap-[10px] w-[23%] h-[23%] md:h-[16%] border-l-[1px] border-[#d1d5db] pl-[14px] mt-[20px] hover:translate-y-[-3px]"
            >
              <div className="basis-2/3 flex flex-col justify-center gap-[10px] grow">
                <p className={`${textClass}`} />
                <p className={`${textClass}`} />
                <p className={`${textClass}`} />
              </div>
              <div className="h-[100%] basis-1/2 rounded-xl ml-auto hidden lg:flex shadow-[#0000003b] shadow-[-3px_3px] bg-gradient-to-r from-slate-100 via-slate-300 to-slate-100 bg-[length:400%_400%] bg-slate-200 animate-skeleton" />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default TrendingArticleSkeleton;
