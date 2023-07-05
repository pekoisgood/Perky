"use client";
import { AuthContext } from "@/context/AuthContext";
import Image from "next/image";
import React, { useContext } from "react";
import { PiFinnTheHumanFill } from "react-icons/pi";

const ProfileAvatar = () => {
  const { user, isLogin } = useContext(AuthContext);
  if (!isLogin) return <></>;
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="border-slate-500 border-[1px] rounded-full w-[80px] h-[80px] overflow-hidden object-cover">
        {user.avatar !== " " ? (
          <Image src={user.avatar} alt="avatar" width={100} height={100} />
        ) : (
          <PiFinnTheHumanFill />
        )}
      </div>
      <p>{user.name}</p>
    </div>
  );
};

export default ProfileAvatar;
