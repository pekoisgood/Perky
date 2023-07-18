const skeletonAnimation =
  "bg-gradient-to-r from-[#eee] via-[#d6d6d6] to-[#eee] bg-[length:400%_400%] animate-skeleton";

const textClass = `rounded-lg shadow-[-3px_3px] shadow-[#0000003b] ${skeletonAnimation}`;

const ArticleListSkeleton = () => {
  return (
    <div className="relative w-[100%] lg:w-[48%] p-4 pt-6 flex justify-between items-start gap-3 border-b-[1px] border-[#d1d5db] min-h-[140px]">
      <div className="flex flex-col gap-4 w-full h-full relative">
        <div
          className={`w-full h-[280px] rounded-2xl shadow-[-10px_10px] shadow-[#0000003b] ${skeletonAnimation}`}
        />
        <p
          className={`rounded-3xl w-[70px] h-[30px] border-2 shadow-[-3px_3px] shadow-[#0000003b] absolute top-[-16px] right-[5px] ${skeletonAnimation}`}
        />

        <div className="flex flex-col gap-3 h-[calc(100%-300px)]">
          <h2 className={`${textClass} h-[30px]`} />
          <h2 className={`${textClass} h-[30px]`} />
          <p className={`w-[90px] mx-auto ${textClass} h-[15px]`} />
          <p className={`${textClass} h-[15px] w-full`} />
          <p className={`${textClass} h-[15px] w-full`} />
          <div className="flex gap-2 items-center w-full">
            <p className={`rounded-md ${textClass} h-[25px] w-1/4`} />
            <p className={`rounded-md ${textClass} h-[25px] w-1/4`} />
            <p className={`rounded-md ${textClass} h-[25px] w-1/4`} />
            <p className={`rounded-md ${textClass} h-[25px] w-1/4`} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleListSkeleton;
