const skeletonAnimation =
  "bg-gradient-to-r from-[#eee] via-[#d6d6d6] to-[#eee] bg-[length:400%_400%] animate-skeleton";

const categoryClass = `h-[20px] w-[80px] shadow-[-3px_3px] shadow-[#bababa] rounded-2xl px-[4px] py-[2px] `;

const DashboardArticleSkeleton = () => {
  return (
    <div className="w-full rounded-lg p-2 basis-1/5 flex gap-2">
      <p className={`${categoryClass} ${skeletonAnimation}`} />
      <p
        className={`w-full rounded-full bg-slate-100 shadow-[-3px_3px] shadow-[#0000003b] ${skeletonAnimation}`}
      />
    </div>
  );
};

export default DashboardArticleSkeleton;
