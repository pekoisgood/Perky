const skeletonAnimation =
  "bg-gradient-to-r from-[#eee] via-[#d6d6d6] to-[#eee] bg-[length:400%_400%] animate-skeleton";

const textClass = `w-full mt-[5px] rounded-full h-[10px] bg-slate-100 shadow-[-3px_3px] shadow-[#0000003b]`;

const BookClubSkeleton = () => {
  return (
    <div className="w-[200px] p-1 rounded-xl bg-[#d6d6d6]">
      <div className="border-dashed border-2 border-[#eee] rounded-lg p-3">
        <p className={`${textClass} ${skeletonAnimation}`} />
        <p className={`${textClass} ${skeletonAnimation}`} />
        <p className={`${textClass} ${skeletonAnimation}`} />
      </div>
    </div>
  );
};

export default BookClubSkeleton;
