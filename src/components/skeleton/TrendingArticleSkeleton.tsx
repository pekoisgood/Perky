import React from "react";

const skeletonAnimation =
  "bg-gradient-to-r from-[#eee] via-[#d6d6d6] to-[#eee] bg-[length:400%_400%] animate-skeleton";

const textClass = `w-full rounded-lg shadow-[-2px_2px] shadow-[#0000003b] ${skeletonAnimation}`;

const TrendingArticleSkeleton = () => {
  return (
    <>
      <div className="relative flex flex-wrap md:justify-between h-[92%] gap-[10px] max-w-[1280px] w-full mx-auto [&>*:nth-child(2)]:border-none z-100 px-[20px]">
        <div className="flex gap-[20px] w-full h-[70%] mt-auto border-b-[1px] border-[#d1d5db] pb-[30px]">
          <div
            className={` min-w-[50vw] rounded-xl shadow-[-10px_10px] shadow-[#0000003b] ${skeletonAnimation}`}
          />
          <div className="flex flex-col gap-[10px] w-full">
            <p
              className={`w-[60px] rounded-full h-[30px] shadow-[-3px_3px] shadow-[#0000003b] ${skeletonAnimation}`}
            />
            <p
              className={`w-full rounded-xl h-[40px] shadow-[-2px_2px] shadow-[#0000003b] ${skeletonAnimation}`}
            />
            <p
              className={`w-full rounded-xl h-[40px] shadow-[-2px_2px] shadow-[#0000003b] ${skeletonAnimation}`}
            />
            <p
              className={`w-full rounded-xl h-[40px] shadow-[-2px_2px] shadow-[#0000003b] ${skeletonAnimation}`}
            />
            <p
              className={`w-[40px] rounded-lg h-[20px] shadow-[-2px_2px] shadow-[#0000003b] ${skeletonAnimation}`}
            />
            <p className={`rounded-md ${textClass} mt-auto h-[17px]`} />
            <p className={`rounded-md ${textClass} h-[17px]`} />
          </div>
        </div>
        {new Array(4).fill("").map((_, index) => {
          return (
            <div
              key={index}
              className="flex gap-[10px] w-[23%] h-[23%] md:h-[16%] border-l-[1px] border-[#d1d5db] pl-[14px] mt-[20px]"
            >
              <div className="basis-2/3 flex flex-col justify-evenly gap-[7px] grow">
                <p
                  className={`w-[60px] rounded-full h-[30px] shadow-[-3px_3px] shadow-[#0000003b] ${skeletonAnimation}`}
                />
                <p className={`${textClass} h-[20px]`} />
                <p className={`${textClass} h-[20px]`} />
                <p className={`${textClass} h-[20px]`} />
              </div>
              <div
                className={`h-[100%] basis-1/2 rounded-xl ml-auto hidden lg:flex shadow-[#0000003b] shadow-[-3px_3px] ${skeletonAnimation}`}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default TrendingArticleSkeleton;
