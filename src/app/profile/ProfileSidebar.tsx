import Link from "next/link";
import { MdOutlineDataThresholding } from "react-icons/md";
import { GrArticle } from "react-icons/gr";
import { BsBookmarkHeart } from "react-icons/bs";
import { PiBooksDuotone } from "react-icons/pi";

const ProfileSidebar = () => {
  return (
    <>
      <div className="absolute left-[50%] translate-x-[-50%] bottom-[10px] bg-[#F2BE22] rounded-[500px] w-[350px] h-[55px] sm:h-[70px] z-0" />
      <div className="flex items-center justify-center gap-5 absolute left-[50%] bottom-[8px] sm:bottom-[5px] translate-x-[-50%] z-10 w-[350px] h-[40px] sm:h-[60px]">
        <Link
          href="/profile/analysis"
          className="group flex flex-col items-center justify-center w-fit py-2 hover:cursor-pointer hover:animate-bounce"
        >
          <MdOutlineDataThresholding size={35} />
          <p className="collapse text-[16px] group-hover:visible">學習分析</p>
        </Link>
        <Link
          href="/profile/articleRecord"
          className="group flex flex-col items-center justify-center w-fit py-2 hover:cursor-pointer hover:animate-bounce"
        >
          <GrArticle size={30} />
          <p className="collapse group-hover:visible">發文紀錄</p>
        </Link>
        <Link
          href="/profile/savedArticle"
          className="group flex flex-col items-center justify-center w-fit py-2 hover:cursor-pointer hover:animate-bounce"
        >
          <BsBookmarkHeart size={30} />
          <p className="collapse group-hover:visible">收藏貼文</p>
        </Link>
        <Link
          href="/profile/bookClub"
          className="group flex flex-col items-center justify-center w-fit py-2 hover:cursor-pointer hover:animate-bounce"
        >
          <PiBooksDuotone size={40} />
          <p className="collapse group-hover:visible">讀書會</p>
        </Link>
      </div>
    </>
  );
};

export default ProfileSidebar;
