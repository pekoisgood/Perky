"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { MdOutlineDataThresholding } from "react-icons/md";
import { FiBookmark } from "react-icons/fi";
import {
  PiBooksDuotone,
  PiFinnTheHumanFill,
  PiFilesBold,
} from "react-icons/pi";
import { RxDashboard } from "react-icons/rx";
import { IoSettingsOutline } from "react-icons/io5";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { firebaseSignOut } from "@/utils/firebase/firebase";
import { logout } from "@/redux/slice/authSlice";

const linkClass = `flex items-center gap-2 hover:text-[#245953] duration-100`;
const titleClass = ``;

const Profile = () => {
  const [showList, setShowList] = useState(false);

  const user = useAppSelector((state) => state.auth.value);
  const dispatch = useAppDispatch();

  const router = useRouter();

  const handleLogout = async () => {
    await firebaseSignOut();
    dispatch(logout);
    setShowList(false);
    router.push("/");
  };

  return (
    <>
      {user.isLogin ? (
        <>
          <div
            onClick={() => setShowList((prev) => !prev)}
            className="rounded-full border-[1px] border-black flex items-center justify-center w-[40px] h-[40px] overflow-hidden hover:cursor-pointer"
          >
            {user.avatar !== "" ? (
              <Image
                src={user.avatar}
                alt="user avatar"
                width={50}
                height={50}
                className="h-full w-full object-cover"
              />
            ) : (
              <PiFinnTheHumanFill />
            )}
          </div>
        </>
      ) : (
        <Link href="/auth">Login</Link>
      )}
      {showList && (
        <>
          <div className="absolute top-[55px] right-[28px] flex flex-col w-0 h-0 boder-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-b-[15px] border-b-[#245953] rotate-[135deg]" />
          <div className="border-[#245953] border-2 absolute top-[61px] right-[15px] flex flex-col gap-2 bg-white rounded-lg py-2 px-5">
            <Link
              href="/profile"
              className={linkClass}
              onClick={() => setShowList(false)}
            >
              <RxDashboard size={20} />
              <p className={titleClass}>Dashboard</p>
            </Link>
            <Link
              href="/profile/analysis"
              className={linkClass}
              onClick={() => setShowList(false)}
            >
              <MdOutlineDataThresholding size={20} />
              <p className={titleClass}>Analysis</p>
            </Link>
            <Link
              href="/profile/articleRecord"
              className={linkClass}
              onClick={() => setShowList(false)}
            >
              <PiFilesBold size={20} />
              <p className={titleClass}>Article Record</p>
            </Link>
            <Link
              href="/profile/savedArticle"
              className={linkClass}
              onClick={() => setShowList(false)}
            >
              <FiBookmark size={20} />
              <p className={titleClass}>Saved Articles</p>
            </Link>
            <Link
              href="/profile/bookClub"
              className={linkClass}
              onClick={() => setShowList(false)}
            >
              <PiBooksDuotone size={20} />
              <p className={titleClass}>Book Club</p>
            </Link>
            <Link
              href="/profile/setting"
              className={linkClass}
              onClick={() => setShowList(false)}
            >
              <IoSettingsOutline size={25} />
              <p className={titleClass}>Setting</p>
            </Link>
            <p
              className="h-fit w-fit mx-auto mt-[20px] px-2 bg-[#245953] text-white border-2 border-[#245953] rounded-lg font-medium hover:text-[#245953] hover:bg-white hover:cursor-pointer"
              onClick={() => {
                handleLogout();
              }}
            >
              Logout
            </p>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
