"use client";
import { useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import { PiFinnTheHumanFill } from "react-icons/pi";

const ProfileAvatar = () => {
  const user = useAppSelector((state) => state.auth.value);

  if (!user.isLogin) return <></>;
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
