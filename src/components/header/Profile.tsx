"use client";
import { AuthContext } from "@/context/AuthContext";
import Image from "next/image";
import { useContext } from "react";
import Link from "next/link";
import { PiFinnTheHumanFill } from "react-icons/pi";

const Profile = () => {
  const { user, isLogin, logOut } = useContext(AuthContext);

  return (
    <>
      <Link
        href={`${isLogin ? "/profile/analyze" : "/auth"}`}
        className="rounded-full flex items-center justify-center w-[40px] h-[40px] object-contain overflow-hidden"
      >
        {isLogin ? (
          <>
            {user.avatar !== " " ? (
              <Image
                src={user.avatar}
                alt="user avatar"
                width={50}
                height={50}
              />
            ) : (
              <PiFinnTheHumanFill />
            )}
          </>
        ) : (
          <p>登入</p>
        )}
      </Link>
      {isLogin && (
        <div className="hidden group-hover:flex group-hover:flex-col justify-center items-center bg-amber-100 rounded-lg p-2 absolute top-[100%] right-0 w-[150px]">
          <div
            className="w-full p-1 hover:bg-orange-200 text-center hover:cursor-pointer"
            onClick={logOut}
          >
            登出
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
