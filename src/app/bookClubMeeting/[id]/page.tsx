"use client";

import Video from "./Video";
import Side from "./Side";
import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { IoIosChatboxes } from "react-icons/io";
import { FaCode } from "react-icons/fa";
import { PiNotepadBold } from "react-icons/pi";
import {
  DocumentData,
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/utils/firebase";
import { useParams } from "next/navigation";
import { CgDetailsMore } from "react-icons/cg";
import { AuthContext } from "@/context/AuthContext";
// import Image from "next/image";
// import curlyHairMan from "../../../assets/image/people/curly-hair-man-holding-smartphone.svg";

type BookClub = {
  name: string;
  roomId: string;
};

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
  const { user } = useContext(AuthContext);
  const [isShowSidebar, setIsShowSidebar] = useState<boolean>(false);
  const [showSidebarMenu, setshowhiddenSidebarMenu] = useState<boolean>(false);
  const [sidebarFunction, setSidebarFunction] = useState<string>("");
  const [bookClub, setBookClub] = useState<BookClub>({
    name: "",
    roomId: "",
  });

  const param = useParams();
  const bookClubId = param.id;

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
      }
    };

    const addAttendee = async () => {
      if (!user.id) return;
      console.log(bookClubId);

      const result: DocumentData = await getDoc(bookClubRef);
      console.log(result.data());

      if (result.data().attendees.includes(user.id)) {
        console.log("return!!");
        return;
      }

      await updateDoc(bookClubRef, {
        attendees: arrayUnion(user.id),
      });
    };

    addAttendee();
    getBookClubInfo();
  }, []);

  return (
    <div className="relative flex flex-col h-full pt-[10px] border-dashed border-2 border-white">
      <motion.h1
        initial="hidden"
        animate="show"
        variants={titleMotion}
        className="w-fit absolute top-0 right-[50%] translate-x-[50%] text-[20px] mb-[10px] text-white"
      >
        {bookClub.name}
      </motion.h1>
      <div className="flex w-full grow pb-[68px] overflow-y-scroll">
        <div
          className={`h-full mx-2 duration-200 animate-damping
            ${isShowSidebar ? "w-[calc(100%-320px)]" : "w-full"}
          
          `}
        >
          <Video roomId={bookClub.roomId} />
          {/* <Image
            src={curlyHairMan}
            alt="curly hair man"
            width={200}
            height={300}
            className="absolute top-[calc(100%-60px)] left-0"
          /> */}
        </div>
        <div
          className={`sm:hidden absolute right-4 bottom-[21px] bg-orange-100 p-1 rounded-lg 
          border-2 border-orange-300 shadow-orange-300 shadow-[-3px_3px]
          hover:cursor-pointer active:shadow-none active:translate-x-[-2px] active:translate-y-[2px]`}
          onClick={() => {
            setshowhiddenSidebarMenu((prev) => !prev);
          }}
        >
          <CgDetailsMore size={20} />
        </div>
        <div
          className={`sm:flex sm:flex-row gap-3 mb-3 absolute sm:bottom-0 bottom-[60px] right-4 z-10  ${
            showSidebarMenu ? "flex flex-col" : "hidden"
          }`}
        >
          <div
            className={`p-2 hover:cursor-pointer rounded-lg border-2 border-orange-300 bg-orange-100
             active:scale-90 ${
               sidebarFunction === sidebarFunctions[0]
                 ? "shadow-none translate-y-[2px] translate-x-[-2px]"
                 : "shadow-[-3px_3px] shadow-orange-300 hover:translate-y-[2px] hover:translate-x-[-2px] hover:shadow-none"
             }`}
            onClick={() => handleClickSidebar(sidebarFunctions[0])}
          >
            <IoIosChatboxes size={27} />
          </div>
          <div
            className={`p-2 hover:cursor-pointer rounded-lg border-2 border-orange-300 bg-orange-100
             active:scale-90 ${
               sidebarFunction === sidebarFunctions[1]
                 ? "shadow-none translate-y-[2px] translate-x-[-2px]"
                 : "shadow-[-3px_3px] shadow-orange-300 hover:translate-y-[2px] hover:translate-x-[-2px] hover:shadow-none"
             }`}
            onClick={() => handleClickSidebar(sidebarFunctions[1])}
          >
            <PiNotepadBold size={27} />
          </div>
          <div
            className={`p-2 hover:cursor-pointer rounded-lg border-2 border-orange-300 bg-orange-100
            active:scale-90 ${
              sidebarFunction === sidebarFunctions[2]
                ? "shadow-none translate-y-[2px] translate-x-[-2px]"
                : "shadow-[-3px_3px] shadow-orange-300 hover:translate-y-[2px] hover:translate-x-[-2px] hover:shadow-none"
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
            className="bg-[#eeeeeed6] rounded-2xl p-3 overflow-y-scroll w-[320px] mr-2"
          >
            <Side sidebarFunction={sidebarFunction} />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Page;
