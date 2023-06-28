"use client";
import { AuthContext } from "@/context/AuthContext";
import Image from "next/image";
import { useContext } from "react";
import Link from "next/link";

const Profile = () => {
  const { user, isLogin } = useContext(AuthContext);

  return (
    <>
      <Link
        href={`${isLogin ? "/profile" : "/auth"}`}
        className="border-2 border-slate-300 rounded-full flex items-center justify-center w-[40px] h-[40px] overflow-hidden object-contain"
      >
        {isLogin ? (
          <Image src={user.avatar} alt="user avatar" width={50} height={50} />
        ) : (
          <p>登入</p>
        )}
      </Link>
    </>
  );
};

export default Profile;
