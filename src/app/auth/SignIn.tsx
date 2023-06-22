"use client";
import { signInwithGoogle } from "@/utils/firebase";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { login } from "@/redux/authSlice";
import Image from "next/image";
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";

const SignIn = () => {
  const { isLogin } = useContext(AuthContext);
  const user = useAppSelector((state) => state.auth.value);
  const dispatch = useAppDispatch();

  const signIn = async () => {
    const result = await signInwithGoogle();
    if (!result) return;
    const name = result.user.displayName;
    const avatar = result.user.photoURL;
    const id = result.user.uid;
    dispatch(login({ name, id, avatar }));
  };

  return (
    <div className="w-screen h-full flex flex-col justify-center items-center">
      <h1>Sign In</h1>
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
        </>
      ) : (
        <button onClick={signIn}>Sign in with google</button>
      )}
    </div>
  );
};

export default SignIn;
