import Image from "next/image";
import Link from "next/link";

const ProfileSidebar = () => {
  return (
    <div className="w-fit flex flex-col items-center gap-2 absolute left-[40px] top-[50%] translate-y-[-50%] translate-x-[50%]">
      <div className="border-slate-500 border-[1px] rounded-full w-[80px] h-[80px] overflow-hidden object-cover">
        <Image src="/" alt="profile avatar" width={80} height={80} />
      </div>
      <h1 className="hover:cursor-pont">Username</h1>
      <div className="flex flex-col w-[100px] border-[1px] border-slate-500 rounded-2xl justify-center items-center overflow-hidden py-1">
        <Link
          href="/profile/analysis"
          className="flex items-center justify-center w-full hover:bg-slate-200 py-2"
        >
          學習分析
        </Link>
        <Link
          href="/profile/articleRecord"
          className="flex items-center justify-center w-full hover:bg-slate-200 py-2"
        >
          發文紀錄
        </Link>
        <Link
          href="/profile/bookClub"
          className="flex items-center justify-center w-full hover:bg-slate-200 py-2"
        >
          讀書會
        </Link>
      </div>
    </div>
  );
};

export default ProfileSidebar;
