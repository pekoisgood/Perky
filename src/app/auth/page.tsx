"use client";

import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "@/context/AuthContext";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "@/utils/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  serverTimestamp,
  doc,
  getDoc,
} from "firebase/firestore";
import laughingLady from "../../assets/image/people/laughing-lady.svg";
import Image from "next/image";
import googleLogo from "../../assets/image/backgroundIcon/google.gif";
import Background from "@/app/auth/Background";
import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";

type User = {
  email: string;
  password: string;
};

const formClass =
  "relative w-[40%] min-w-[350px] lg:min-w-[500px] min-h-[500px] p-5 backdrop-filter backdrop-blur-[2px] bg-white/90 border-2 border-[#245953] shadow-lg rounded-xl flex flex-col justify-between items-center gap-[10px] z-10";

const inputClass =
  "text-[20px] outline-none border-2 w-full bg-transparent border-dashed border-[#245953] rounded-md p-2 h-[35px] focus:border-solid placeholder:text-[#245953]";

const titleClass = "text-[30px] font-bold text-[#245953] tracking-[1px]";

const labelClass = "self-start";

const buttonClass =
  "bg-transparent scale-100 text-[#245953] tracking-[1px] font-semibold text-[15px] outline-none border-2 border-[#245953] shadow-[#245953] shadow-[-3px_3px] rounded-lg px-2 py-1 hover:bg-[#245953] hover:text-white hover:shadow-none hover:translate-y-[3px] hover:translate-x-[-3px] focus:scale-95 duration-75";

const sloganClass =
  "text-[60px] sm:text-[30px] md:text-[50px] lg:text-[70px] xl:text-[90px] font-extrabold tracking-[3px] text-[#245953] z-0";

const Page = () => {
  const { setIsLogin, logIn, setUser, isLogin } = useContext(AuthContext);
  const [loginPage, setLoginPage] = useState(true);
  const [userInput, setUserInput] = useState<User>({
    email: "demo@gmail.com",
    password: "demo123",
  });
  const [isLoginFail, setIsLoginFail] = useState<boolean | null>(null);

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
      setUser({
        name: `user-${email}`,
        id: userId,
        avatar: "",
      });
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
          name: `user-${userInput.email}`,
          createdAt: serverTimestamp(),
        });
      }
    } catch (error) {
      console.log(error);
      setIsLogin(false);
      setIsLoginFail(true);
      return;
    }
    setIsLogin(true);
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
      const result = getDoc(userRef);
      console.log(result);

      setUser({
        name: `user-${email}`,
        id: userId,
        avatar: "",
      });
    } catch (error) {
      console.log(error);
      setIsLoginFail(true);
      setIsLogin(false);
      return;
    }
    setIsLogin(true);
    router.replace("/profile");
    return;
  };

  useEffect(() => {
    if (isLogin) redirect("/profile");
  }, [isLogin]);

  return (
    <>
      <div className="relative min-h-[calc(100vh-60px)] w-screen max-w-[1210px] mx-auto flex gap-4 justify-center items-center px-[20px]">
        <div className="w-[60%] max-w-fit sm:static absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] sm:translate-x-0 sm:translate-y-0">
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
                    setIsLoginFail(null);
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
                    setIsLoginFail(null);
                    setUserInput((prev) => {
                      return { ...prev, password: e.target.value };
                    });
                  }}
                />
              </div>
              {isLoginFail && (
                <p className="text-red-400 text-[14px]">
                  Email and Password does not match... Please try again.
                </p>
              )}
            </div>

            <button type="submit" className={buttonClass}>
              Login
            </button>

            <hr />
            <div className="bg-white rounded-[5px] border-[1px] border-[#888] shadow-gray-400 shadow-md px-3 py-2 flex gap-1">
              <Image
                src={googleLogo}
                width={40}
                height={40}
                alt="google logo"
              />
              <button onClick={logIn}>Sign in with google</button>
            </div>
            <p
              className="hover:cursor-pointer text-[#245953] text-[12px]"
              onClick={() => {
                setIsLoginFail(null);
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
              {isLoginFail && (
                <p className="text-red-400 text-[14px]">
                  Email already used... Please try another.
                </p>
              )}
            </div>
            <button type="submit" className={buttonClass}>
              Sign Up
            </button>
            <p
              className="hover:cursor-pointer text-[#245953] text-[12px]"
              onClick={() => {
                setIsLoginFail(null);
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
        className="absolute left-0 bottom-0"
      />
    </>
  );
};

export default Page;
