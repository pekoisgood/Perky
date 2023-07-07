import Link from "next/link";
import { MdOutlineDataThresholding } from "react-icons/md";
import { GrArticle } from "react-icons/gr";
import { FiBookmark } from "react-icons/fi";
import { PiBooksDuotone } from "react-icons/pi";

const ProfileSidebar = () => {
  return (
    <>
      <div className="absolute left-[50%] translate-x-[-50%] bottom-[19px] bg-[#F9E2AF] rounded-[500px] w-[472px] h-[55px] sm:h-[70px] z-0" />
      <div className="flex items-center justify-center absolute left-[50%] bottom-[8px] sm:bottom-[13px] translate-x-[-50%] z-10 w-[350px] h-[40px] sm:h-[60px]">
        <Link
          href="/profile/analysis"
          className="group flex flex-col items-center justify-center w-[115px] py-2 hover:cursor-pointer hover:animate-bounce"
        >
          <MdOutlineDataThresholding size={37} />
          <p className="collapse text-[16px] text-center w-[115px] group-hover:visible">
            Analysis
          </p>
        </Link>
        <Link
          href="/profile/articleRecord"
          className="group flex flex-col items-center justify-center w-[115px] py-2 hover:cursor-pointer hover:animate-bounce"
        >
          <GrArticle size={32} />
          <p className="collapse group-hover:visible text-center text-[16px] w-[115px]">
            Article Record
          </p>
        </Link>
        <Link
          href="/profile/savedArticle"
          className="group flex flex-col items-center justify-center w-[115px] py-2 hover:cursor-pointer hover:animate-bounce"
        >
          <FiBookmark size={30} />
          <p className="collapse group-hover:visible text-center text-[16px] w-[115px]">
            Saved Articles
          </p>
        </Link>
        <Link
          href="/profile/bookClub"
          className="group flex flex-col items-center justify-center w-[115px] py-2 hover:cursor-pointer hover:animate-bounce"
        >
          <PiBooksDuotone size={36} />
          <p className="collapse group-hover:visible text-center text-[16px] w-[115px]">
            Book Club
          </p>
        </Link>
      </div>
    </>
  );
};

export default ProfileSidebar;
