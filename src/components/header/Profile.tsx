"use client";
import { AuthContext } from "@/context/AuthContext";
import Image from "next/image";
import { useContext } from "react";

const Profile = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Image src={user.avatar} alt="user avatar" width={50} height={50} />
    </>
  );
};

export default Profile;
