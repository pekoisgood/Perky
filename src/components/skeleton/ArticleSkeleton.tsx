import React from "react";

const ArticleSkeleton = () => {
  return (
    <div className="w-full max-w-[800px] rounded-lg flex flex-col gap-2 items-center justify-center mx-auto py-10">
      <div className="relative w-full">
        <h1 className="font-bold text-[24px] sm:text-[30px] w-fit mx-auto tracking-[1px] indent-[1px] text-center" />
      </div>
      <div className="flex gap-3 items-center text-[13px] sm:text-[16px] text-[#245953]" />
      <p />
      <div className="w-full h-fit object-cover mx-auto overflow-hidden rounded-2xl border-2 border-dashed border-[#245953] shadow-[#245953] shadow-[-7px_7px]" />
      <div className="w-full mx-auto mt-8"></div>
    </div>
  );
};

export default ArticleSkeleton;
