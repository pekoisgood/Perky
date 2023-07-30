"use client";

import React, { useState, useEffect } from "react";
import { useRouter, redirect } from "next/navigation";
import Image from "next/image";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  serverTimestamp,
  doc,
  getDoc,
  DocumentData,
} from "firebase/firestore";

import {
  auth,
  db,
  getUserInfo,
  signInWithGoogle,
} from "@/utils/firebase/firebase";
import { LoginUserInput } from "@/utils/types/types";
import { CustomError } from "@/utils/types/types";
import Background from "@/app/auth/Background";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setIsLogin, setUser } from "@/redux/slice/authSlice";
import laughingLady from "../../assets/image/people/laughing-lady.svg";
import googleLogo from "../../assets/image/backgroundIcon/google.gif";

const formClass =
  "relative w-[40%] min-w-[350px] lg:min-w-[500px] min-h-[500px] p-5 backdrop-filter backdrop-blur-[2px] bg-white/90 border-2 border-[#245953] shadow-lg rounded-xl flex flex-col justify-between items-center gap-[10px] z-10";

const inputClass =
  "text-[20px] outline-none border-2 w-full bg-transparent border-dashed border-[#245953] rounded-md p-2 h-[35px] focus:border-solid placeholder:text-[#245953]";

const titleClass = "text-[30px] font-bold text-[#245953] tracking-[1px]";

const labelClass = "self-start";

const buttonClass =
  "bg-transparent scale-100 text-[#245953] tracking-[1px] font-semibold text-[15px] outline-none border-2 border-[#245953] shadow-[#245953] shadow-[-3px_3px] rounded-lg px-2 py-1 hover:bg-[#245953] hover:text-white hover:shadow-none hover:translate-y-[3px] hover:translate-x-[-3px] focus:scale-95 duration-75";

const sloganClass =
  "sm:text-[28px] md:text-[48px] lg:text-[63px] xl:text-[90px] font-extrabold tracking-[3px] text-[#245953] relative";

const Page = () => {
  const [loginPage, setLoginPage] = useState(true);
  const [userInput, setUserInput] = useState<LoginUserInput>({
    email: "demo@gmail.com",
    password: "demo123",
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.value);
  const router = useRouter();

  const handleNativeSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userInput || !userInput.email || !userInput.password) return;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        userInput.email,
        userInput.password
      );
      const user = userCredential.user;
      const userId = user.uid;
      const email = user.email;

      dispatch(
        setUser({
          name: email!,
          email: email!,
          id: userId,
          avatar: "",
        })
      );

      const userRef = collection(db, "users");
      const q = query(userRef, where("userId", "==", userId));

      const userDoc = await getDocs(q);
      let isUserExist;
      userDoc.forEach((userDoc) => {
        isUserExist = userDoc.data();
      });

      if (!isUserExist) {
        await setDoc(doc(db, "users", userId), {
          userId: userId,
          email: email,
          name: userInput.email,
          createdAt: serverTimestamp(),
        });
      }
      router.push("/profile");
      dispatch(setIsLogin(true));
    } catch (error) {
      dispatch(setIsLogin(false));
      setErrorMessage((error as CustomError).code.split("/")[1]);
      return;
    }
    return;
  };

  const handleNativeLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userInput || !userInput.email || !userInput.password) return;

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        userInput.email,
        userInput.password
      );
      const user = userCredential.user;
      const userId = user.uid;
      const email = user.email;

      const userRef = doc(db, "users", userId);
      const userInfo: DocumentData = await getDoc(userRef);

      dispatch(
        setUser({
          name: userInfo.data().name,
          id: userId,
          avatar: userInfo.data().avatar ?? "",
          email: email!,
        })
      );
    } catch (error) {
      setErrorMessage((error as CustomError).code.split("/")[1]);
      dispatch(setIsLogin(false));
      return;
    }
    router.push("/profile");
    return;
  };

  const handleGoogleSignIn = async () => {
    const result = await signInWithGoogle();
    if (!result) return;

    const userInfo: DocumentData = await getUserInfo(result.user.uid);
    dispatch(
      setUser({
        email: userInfo.data().email ?? result.user.email,
        id: result.user.uid,
        name: userInfo.data().name ?? result.user.displayName,
        avatar: userInfo.data().avatar ?? result.user.photoURL,
      })
    );
  };

  useEffect(() => {
    if (user.isLogin) redirect("/profile");
  }, [user.isLogin]);

  return (
    <>
      <div className="relative min-h-[calc(100vh-60px)] w-screen max-w-[1210px] mx-auto flex gap-4 justify-center items-center px-[20px]">
        <div className="w-[60%] max-w-fit sm:static absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] hidden md:block sm:translate-x-0 sm:translate-y-0 z-[1]">
          <h1 className={`${sloganClass}`}>
            Learn
            <br /> Together,
          </h1>
          <h1 className={`${sloganClass}`}>
            Empower
            <br /> One Another.
          </h1>
        </div>
        <div className="fixed top-0 bottom-0 left-0 right-0">
          <Background />
        </div>

        {loginPage ? (
          <form className={formClass} onSubmit={(e) => handleNativeLogin(e)}>
            <h2 className={titleClass}>Login</h2>
            <div className="w-full">
              <div>
                <label className={labelClass}>Email</label>
                <input
                  type="text"
                  className={inputClass}
                  value={userInput.email}
                  onChange={(e) => {
                    setErrorMessage(null);
                    setUserInput((prev) => {
                      return { ...prev, email: e.target.value };
                    });
                  }}
                />
              </div>
              <div className="mt-[10px]">
                <label className={labelClass}>Password</label>
                <input
                  type="password"
                  className={inputClass}
                  value={userInput.password}
                  onChange={(e) => {
                    setErrorMessage(null);
                    setUserInput((prev) => {
                      return { ...prev, password: e.target.value };
                    });
                  }}
                />
              </div>
              {errorMessage && (
                <p className="text-red-400 text-[14px] mt-2">{errorMessage}</p>
              )}
            </div>

            <button type="submit" className={buttonClass}>
              Login
            </button>

            <hr />
            <div className="bg-white rounded-[5px] border-[1px] border-[#888] shadow-gray-400 shadow-md px-3 py-2 flex items-center gap-1 hover:cursor-pointer">
              <Image
                src={googleLogo}
                width={40}
                height={40}
                alt="google logo"
              />
              <div onClick={handleGoogleSignIn}>Login in with google</div>
            </div>
            <p
              className="hover:cursor-pointer text-[#245953] text-[12px]"
              onClick={() => {
                setErrorMessage(null);
                setLoginPage(false);
              }}
            >
              Does not have an accout ? Sign Up
            </p>
          </form>
        ) : (
          <form className={formClass} onSubmit={(e) => handleNativeSignUp(e)}>
            <h2 className={titleClass}>Sign Up</h2>
            <div className="w-full">
              <div>
                <label className={labelClass}>Email</label>
                <input
                  type="text"
                  className={inputClass}
                  value={userInput.email}
                  onChange={(e) =>
                    setUserInput((prev) => {
                      return { ...prev, email: e.target.value };
                    })
                  }
                />
              </div>
              <div className="mt-[10px]">
                <label className={labelClass}>Password</label>
                <input
                  type="text"
                  className={inputClass}
                  value={userInput.password}
                  onChange={(e) =>
                    setUserInput((prev) => {
                      return { ...prev, password: e.target.value };
                    })
                  }
                />
              </div>
              {errorMessage && (
                <p className="text-red-400 text-[14px] mt-2">{errorMessage}</p>
              )}
            </div>
            <button type="submit" className={buttonClass}>
              Sign Up
            </button>
            <p
              className="hover:cursor-pointer text-[#245953] text-[12px]"
              onClick={() => {
                setErrorMessage(null);
                setLoginPage(true);
              }}
            >
              Have an accout ? Login
            </p>
          </form>
        )}
      </div>
      <Image
        src={laughingLady}
        alt="laughing lady"
        width={200}
        height={300}
        className="absolute left-0 bottom-0 z-1"
      />
    </>
  );
};

export default Page;
