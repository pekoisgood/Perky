"use client";

import { AuthContext } from "@/context/AuthContext";
import Image from "next/image";
import { useContext } from "react";
import { PiFinnTheHumanFill } from "react-icons/pi";

const UserProfile = () => {
  const { user } = useContext(AuthContext);

  if (!user) return <></>;
  return (
    <>
      <div className="flex justify-center items-center rounded-full border-[1px] border-black w-[100px] h-[100px] md:w-[150px] md:h-[150px] object-cover overflow-hidden">
        {user.avatar !== "" ? (
          <Image
            src={user.avatar}
            alt="user's avatar"
            width={150}
            height={150}
          />
        ) : (
          <PiFinnTheHumanFill size={30} className="w-[90%] h-[90%]" />
        )}
      </div>
      <p className="mt-5">{user.name}</p>
    </>
  );
};

export default UserProfile;
