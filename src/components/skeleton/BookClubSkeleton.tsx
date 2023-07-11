import React from "react";

const textClass = `w-full mt-[5px] rounded-md h-[10px] bg-slate-100`;

const BookClubSkeleton = () => {
  return (
    <div className="w-[200px] p-1 rounded-xl bg-gradient-to-r from-slate-100 via-slate-300 to-slate-100 bg-[length:400%_400%] animate-skeleton">
      <div className="border-dashed border-2 border-white rounded-lg p-3">
        <p className={textClass} />
        <p className={textClass} />
        <p className={textClass} />
      </div>
    </div>
  );
};

export default BookClubSkeleton;
