const categoryClass = `w-[80px] bg-slate-100 shadow-[-3px_3px] shadow-[#bababa] rounded-2xl px-[4px] py-[2px] `;

const DashboardArticleSkeleton = () => {
  return (
    <div className="w-full rounded-lg p-2 basis-1/5 flex gap-2 bg-gradient-to-r from-slate-100 via-slate-300 to-slate-100 bg-[length:400%_400%] animate-skeleton">
      <p className={categoryClass} />
      <p className={`w-full rounded-md bg-slate-100`} />
    </div>
  );
};

export default DashboardArticleSkeleton;
