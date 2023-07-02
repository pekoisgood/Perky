"use client";

import { AuthContext } from "@/context/AuthContext";
import Image from "next/image";
import { useContext } from "react";

const UserProfile = () => {
  const { user } = useContext(AuthContext);

  if (!user) return <></>;
  return (
    <>
      <div className="rounded-full border-4 border-[#1A4D2E] w-[150px] h-[150px] object-cover overflow-hidden">
        <Image src={user.avatar} alt="user's avatar" width={150} height={150} />
      </div>
      <p>用戶名：{user.name}</p>
      <p>id : {user.id}</p>
    </>
  );
};

export default UserProfile;
