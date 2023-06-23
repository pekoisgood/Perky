"use client";
import Image from "next/image";
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";
import googleLogo from "./google.png";

const SignIn = () => {
  const { isLogin, logIn, logOut, user } = useContext(AuthContext);

  console.log(isLogin);

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <h1 className="mb-[30px]">Sign In Page</h1>
      {isLogin ? (
        <>
          <div>
            <Image
              src={user.avatar}
              alt="user avatar"
              width={100}
              height={100}
              priority={true}
            />
          </div>
          <h1>name: {user.name}</h1>
          <button onClick={logOut}>Sign out</button>
        </>
      ) : (
        <div className="bg-white rounded-[5px] border-[1px] border-[#888] shadow-gray-400 shadow-md px-5 py-2 flex gap-1">
          <Image src={googleLogo} width={24} height={24} alt="google logo" />
          <button onClick={logIn}>Sign in with google</button>
        </div>
      )}
    </div>
  );
};

export default SignIn;
