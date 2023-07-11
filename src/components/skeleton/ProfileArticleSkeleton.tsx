const textClass = `h-[20px] w-full rounded-md bg-slate-100`;

const ProfileArticleSkeleton = () => {
  return (
    <div className="bg-slate-100 rounded-xl p-1 block mb-3 break-inside-avoid bg-gradient-to-r from-slate-100 via-slate-300 to-slate-100 bg-[length:400%_400%] animate-skeleton">
      <div className="flex flex-col gap-2 h-full justify-center p-3 border-dashed border-2 border-[#eee] rounded-lg ">
        <div className="w-full h-[100px] mx-auto overflow-hidden rounded-2xl bg-slate-100" />
        <p className={textClass} />
        <p className={textClass} />
      </div>
    </div>
  );
};

export default ProfileArticleSkeleton;
