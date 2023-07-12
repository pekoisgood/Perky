const skeletonAnimation =
  "bg-gradient-to-r from-[#eee] via-[#d6d6d6] to-[#eee] bg-[length:400%_400%] animate-skeleton";

const textClass = `w-full rounded-lg h-[20px] shadow-[-3px_3px] shadow-[#0000003b] ${skeletonAnimation}`;

const ArticleListSkeleton = () => {
  return (
    <div className="w-[100%] lg:w-[48%] p-4 pt-6 flex justify-between items-start gap-3 border-b-[1px] border-[#d1d5db] min-h-[140px]">
      <div className="flex flex-col gap-4 w-full h-full relative">
        <div
          className={`w-full h-[300px] rounded-2xl shadow-[-3px_3px] shadow-[#0000003b] ${skeletonAnimation}`}
        />
        <div className="flex flex-col gap-2 h-[calc(100%-300px)]">
          <h2 className={textClass} />
          <h2 className={textClass} />
          <h2 className={textClass} />
          <p
          // className={`rounded-3xl w-[100px] h-[30px] absolute top-[-16px] right-[5px] ${skeletonAnimation}`}
          />
        </div>
      </div>
    </div>
  );
};

export default ArticleListSkeleton;
