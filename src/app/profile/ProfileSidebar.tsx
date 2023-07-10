"use client";

import { useState } from "react";
import Link from "next/link";
import { MdOutlineDataThresholding } from "react-icons/md";
import { FiBookmark } from "react-icons/fi";
import { PiBooksDuotone, PiFilesBold } from "react-icons/pi";
import { RxDashboard } from "react-icons/rx";
import { IoSettingsOutline } from "react-icons/io5";
import { usePathname } from "next/navigation";

const titleClass = ` hidden lg:flex text-[16px] lg:text-[18px] font-medium`;

const tabs = [
  "DASHBOARD",
  "ANALYSIS",
  "ARTICLERECORD",
  "SAVEDARTICLE",
  "BOOKCLUB",
  "SETTING",
];

const ProfileSidebar = () => {
  const pathName = usePathname();
  const getTab = () => {
    const profilePath = "/profile";
    if (pathName === profilePath) {
      return tabs[0];
    }
    for (let i = 0; i < tabs.length; i++) {
      if ("/PROFILE/" + tabs[i] === pathName.toUpperCase()) {
        return tabs[i];
      }
    }
  };

  const [activePage, setActivePage] = useState(getTab());
  const linkClass = (index: number) => {
    return `flex gap-2 items-center hover:translate-y-[-3px] duration-100 lg:pl-[15px] ${
      activePage === tabs[index] &&
      "bg-[#245953] text-white lg:text-[#245953] rounded-full p-1 lg:text-black lg:bg-transparent lg:pr-0 lg:py-0 lg:border-r-2 lg:rounded-none border-[#245953]"
    }`;
  };

  return (
    <>
      <Link
        href="/profile"
        className={linkClass(0)}
        onClick={() => setActivePage(tabs[0])}
      >
        <p className={titleClass}>Dashboard</p>
        <RxDashboard size={25} />
      </Link>
      <Link
        href="/profile/analysis"
        className={linkClass(1)}
        onClick={() => setActivePage(tabs[1])}
      >
        <p className={titleClass}>Analysis</p>
        <MdOutlineDataThresholding size={25} />
      </Link>
      <Link
        href="/profile/articleRecord"
        className={linkClass(2)}
        onClick={() => setActivePage(tabs[2])}
      >
        <p className={titleClass}>Article Record</p>
        <PiFilesBold size={25} />
      </Link>
      <Link
        href="/profile/savedArticle"
        className={linkClass(3)}
        onClick={() => setActivePage(tabs[3])}
      >
        <p className={titleClass}>Saved Articles</p>
        <FiBookmark size={25} />
      </Link>
      <Link
        href="/profile/bookClub"
        className={linkClass(4)}
        onClick={() => setActivePage(tabs[4])}
      >
        <p className={titleClass}>Book Club</p>
        <PiBooksDuotone size={25} />
      </Link>
      <Link
        href="/profile/bookClub"
        className={linkClass(5)}
        onClick={() => setActivePage(tabs[5])}
      >
        <p className={titleClass}>Setting</p>
        <IoSettingsOutline size={25} />
      </Link>
    </>
  );
};

export default ProfileSidebar;

{
  /* <>
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
    </> */
}
