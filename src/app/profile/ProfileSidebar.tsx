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
    return `flex gap-2 items-center duration-100 lg:pl-[15px] z-10 lg:bg-white/70 ${
      activePage === tabs[index]
        ? "bg-[#245953] text-white lg:text-[#245953] rounded-full p-1 lg:bg-white/70 lg:pr-0 lg:py-0 lg:border-r-2 lg:rounded-none border-[#245953]"
        : "hover:text-[#245953]"
    }`;
  };

  return (
    <div className="flex flex-row lg:flex-col gap-4 w-fit mx-auto px-3 rounded-full shadow-sm lg:shadow-none bg-white lg:bg-transparent">
      <Link
        href="/profile"
        className={linkClass(0)}
        onClick={() => setActivePage(tabs[0])}
      >
        <RxDashboard size={25} />
        <p className={titleClass}>Dashboard</p>
      </Link>
      <Link
        href="/profile/analysis"
        className={linkClass(1)}
        onClick={() => setActivePage(tabs[1])}
      >
        <MdOutlineDataThresholding size={25} />
        <p className={titleClass}>Analysis</p>
      </Link>
      <Link
        href="/profile/articleRecord"
        className={linkClass(2)}
        onClick={() => setActivePage(tabs[2])}
      >
        <PiFilesBold size={25} />
        <p className={titleClass}>Article Record</p>
      </Link>
      <Link
        href="/profile/savedArticle"
        className={linkClass(3)}
        onClick={() => setActivePage(tabs[3])}
      >
        <FiBookmark size={25} />
        <p className={titleClass}>Saved Articles</p>
      </Link>
      <Link
        href="/profile/bookClub"
        className={linkClass(4)}
        onClick={() => setActivePage(tabs[4])}
      >
        <PiBooksDuotone size={25} />
        <p className={titleClass}>Book Club</p>
      </Link>
      <Link
        href="/profile/setting"
        className={linkClass(5)}
        onClick={() => setActivePage(tabs[5])}
      >
        <IoSettingsOutline size={25} />
        <p className={titleClass}>Setting</p>
      </Link>
    </div>
  );
};

export default ProfileSidebar;
