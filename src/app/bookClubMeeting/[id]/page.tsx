"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { motion } from "framer-motion";
import { IoIosChatboxes } from "react-icons/io";
import { FaCode } from "react-icons/fa";
import { PiNotepadBold } from "react-icons/pi";
import { CgDetailsMore } from "react-icons/cg";
import {
  DocumentData,
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setBookClubMeetingGuest } from "@/redux/slice/bookClubMeetingSlice";
import { db } from "@/utils/firebase/firebase";
import { BookClubIdAndName } from "@/utils/types/types";

import Video from "./Video";
import Side from "./Side";

const titleMotion = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
  },
  transition: {
    type: "ease",
    stiffness: 110,
    duration: 100,
    delay: 1,
  },
};

const sidebarFunctions = ["CHATROOM", "NOTE", "CODE EDITOR"];

const sidebarFunctionContainerMotion = {
  hidden: {
    x: 100,
    opacity: 0,
  },
  show: {
    x: 0,
    opacity: 1,
  },
  transition: {
    type: "spring",
    damping: 20,
    stiffness: 110,
    duration: 100,
  },
};

const Page = () => {
  const [isShowSidebar, setIsShowSidebar] = useState<boolean>(false);
  const [showSidebarMenu, setshowhiddenSidebarMenu] = useState<boolean>(false);
  const [sidebarFunction, setSidebarFunction] = useState<string>("");
  const [bookClub, setBookClub] = useState<BookClubIdAndName>({
    name: "",
    roomId: "",
  });
  const [text, setText] = useState<string>("");
  const [code, setCode] = useState<string>("console.log('hello world')");

  const user = useAppSelector((state) => state.auth.value);

  const router = useRouter();
  const param = useParams<{ id: string }>();
  const bookClubId = param.id;

  const dispatch = useAppDispatch();

  const handleClickSidebar = (sidebarFunc: string) => {
    setIsShowSidebar(true);
    setshowhiddenSidebarMenu(false);
    if (sidebarFunction === sidebarFunc) {
      setIsShowSidebar(false);
      setSidebarFunction("");
      return;
    }
    setSidebarFunction(sidebarFunc);
  };

  useEffect(() => {
    const bookClubRef = doc(db, "bookClubs", bookClubId);
    const getBookClubInfo = async () => {
      const result: DocumentData = await getDoc(bookClubRef);
      if (result) {
        setBookClub({
          name: result.data().name,
          roomId: result.data().roomId,
        });
        const guestList = result.data().guest;

        for (let i = 0; i < guestList.length; i++) {
          const guestRef = doc(db, "users", guestList[i]);
          const userInfo: DocumentData = await getDoc(guestRef);

          dispatch(
            setBookClubMeetingGuest({
              name: userInfo.data().name,
              avatar: userInfo.data().avatar,
              id: userInfo.id,
            }),
          );
        }
      }
    };

    const addAttendee = async () => {
      if (!user.id) return;

      const result: DocumentData = await getDoc(bookClubRef);

      if (result.data().attendees.includes(user.id)) {
        return;
      }

      await updateDoc(bookClubRef, {
        attendees: arrayUnion(user.id),
      });
    };

    if (user.isLogin === false) {
      router.push("/auth");
    }

    addAttendee();
    getBookClubInfo();
  }, [user.id, bookClubId]);

  return (
    <div className="relative flex h-full flex-col border-2 border-dashed border-white pt-[10px]">
      <motion.h1
        initial="hidden"
        animate="show"
        variants={titleMotion}
        className="absolute right-[50%] top-0 mb-[10px] w-fit translate-x-[50%] text-[20px] text-white"
      >
        {bookClub.name}
      </motion.h1>
      <div className="flex w-full grow overflow-y-scroll pb-[68px]">
        <div
          className={`mx-2 h-full animate-damping duration-200
            ${isShowSidebar ? "w-[calc(100%-320px)]" : "w-full"}
          
          `}
        >
          <Video roomId={bookClub.roomId} />
        </div>
        <div
          className={`absolute bottom-[21px] right-4 rounded-lg border-2 border-orange-300 bg-orange-100 
          p-1 shadow-[-3px_3px] shadow-orange-300 hover:cursor-pointer
          active:translate-x-[-2px] active:translate-y-[2px] active:shadow-none sm:hidden`}
          onClick={() => {
            setshowhiddenSidebarMenu((prev) => !prev);
          }}
        >
          <CgDetailsMore size={20} />
        </div>
        <div
          className={`absolute bottom-[60px] right-4 z-10 mb-3 gap-3 sm:bottom-0 sm:flex sm:flex-row  ${
            showSidebarMenu ? "flex flex-col" : "hidden"
          }`}
        >
          <div
            className={`rounded-lg border-2 border-orange-300 bg-orange-100 p-2 hover:cursor-pointer
             active:scale-90 ${
               sidebarFunction === sidebarFunctions[0]
                 ? "translate-x-[-2px] translate-y-[2px] shadow-none"
                 : "shadow-[-3px_3px] shadow-orange-300 hover:translate-x-[-2px] hover:translate-y-[2px] hover:shadow-none"
             }`}
            onClick={() => handleClickSidebar(sidebarFunctions[0])}
          >
            <IoIosChatboxes size={27} />
          </div>
          <div
            className={`rounded-lg border-2 border-orange-300 bg-orange-100 p-2 hover:cursor-pointer
             active:scale-90 ${
               sidebarFunction === sidebarFunctions[1]
                 ? "translate-x-[-2px] translate-y-[2px] shadow-none"
                 : "shadow-[-3px_3px] shadow-orange-300 hover:translate-x-[-2px] hover:translate-y-[2px] hover:shadow-none"
             }`}
            onClick={() => handleClickSidebar(sidebarFunctions[1])}
          >
            <PiNotepadBold size={27} />
          </div>
          <div
            className={`rounded-lg border-2 border-orange-300 bg-orange-100 p-2 hover:cursor-pointer
            active:scale-90 ${
              sidebarFunction === sidebarFunctions[2]
                ? "translate-x-[-2px] translate-y-[2px] shadow-none"
                : "shadow-[-3px_3px] shadow-orange-300 hover:translate-x-[-2px] hover:translate-y-[2px] hover:shadow-none"
            }`}
            onClick={() => handleClickSidebar(sidebarFunctions[2])}
          >
            <FaCode size={26} />
          </div>
        </div>
        {isShowSidebar && (
          <motion.div
            initial="hidden"
            animate="show"
            variants={sidebarFunctionContainerMotion}
            className="mr-2 w-[320px] overflow-y-scroll rounded-2xl bg-[#eeeeeed6] p-3"
          >
            <Side
              sidebarFunction={sidebarFunction}
              text={text}
              setText={setText}
              code={code}
              setCode={setCode}
            />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Page;
