import React from "react";

const skeletonAnimation =
  "bg-gradient-to-r from-[#eee] via-[#d6d6d6] to-[#eee] bg-[length:400%_400%] animate-skeleton";

const contentClass = `w-full h-[20px] rounded-full shadow-[-3px_3px] shadow-[#0000003b] ${skeletonAnimation}`;

const ArticleSkeleton = () => {
  return (
    <div className="w-full max-w-[800px] rounded-lg flex flex-col gap-2 items-center justify-center mx-auto py-10">
      <div className="relative w-full">
        <h1
          className={`w-full h-[40px] shadow-[-3px_3px] shadow-[#0000003b] rounded-full ${skeletonAnimation}`}
        />
      </div>
      <p
        className={`${skeletonAnimation} shadow-[-3px_3px] shadow-[#0000003b] w-full max-w-[300px] h-[30px] rounded-full`}
      />
      <p
        className={`${skeletonAnimation} shadow-[-3px_3px] shadow-[#0000003b] w-full max-w-[100px] h-[30px] rounded-full`}
      />

      <div
        className={`w-full h-[500px] rounded-2xl border-2 border-dashed border-[#eee] shadow-[#929090] shadow-[-7px_7px] ${skeletonAnimation}`}
      />
      <div className="flex flex-col gap-3 mt-[20px] w-full">
        <p className={contentClass} />
        <p className={contentClass} />
        <p className={contentClass} />
        <p className={contentClass} />
        <p className={contentClass} />
        <p className={contentClass} />
        <p className={contentClass} />
      </div>
    </div>
  );
};

export default ArticleSkeleton;
