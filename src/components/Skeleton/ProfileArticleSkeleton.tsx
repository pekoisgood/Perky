const skeletonAnimation =
  "bg-gradient-to-r from-[#eee] via-[#d6d6d6] to-[#eee] bg-[length:400%_400%] animate-skeleton";

const textClass = `h-[20px] w-full rounded-full bg-slate-100 shadow-[-3px_3px] shadow-[#0000003b]`;

const ProfileArticleSkeleton = () => {
  return (
    <div className="rounded-xl p-1 block mb-3 break-inside-avoid bg-[#d6d6d6]">
      <div className="flex flex-col gap-2 h-full justify-center p-3 border-dashed border-2 border-[#eee] rounded-lg ">
        <div
          className={`w-full h-[100px] mx-auto overflow-hidden rounded-2xl shadow-[-3px_3px] shadow-[#0000003b] ${skeletonAnimation}`}
        />
        <p className={`${textClass} ${skeletonAnimation}`} />
        <p className={`${textClass} ${skeletonAnimation}`} />
      </div>
    </div>
  );
};

export default ProfileArticleSkeleton;
