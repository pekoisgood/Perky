"use client";

import Video from "./Video";
import Side from "./Side";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { IoIosChatboxes } from "react-icons/io";
import { FaCode } from "react-icons/fa";
import { PiNotepadBold } from "react-icons/pi";
import { DocumentData, doc, getDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { useParams } from "next/navigation";
import { CgDetailsMore } from "react-icons/cg";

type BookClub = {
  name: string;
  roomId: string;
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
    const getBookClubInfo = async () => {
      const bookClubRef = doc(db, "bookClubs", bookClubId);
      const result: DocumentData = await getDoc(bookClubRef);
      if (result) {
        setBookClub({
          name: result.data().name,
          roomId: result.data().roomId,
        });
      }
    };

    getBookClubInfo();
  }, []);

  return (
    <div className="relative flex flex-col h-full pt-[10px] border-dashed border-2 border-white">
      <h1 className="w-fit mx-auto text-[20px] mb-[10px] text-white">
        {bookClub.name}
      </h1>
      <div className="flex gap-2 w-full grow pb-[68px] overflow-y-scroll">
        <Video roomId={bookClub.roomId} />
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
            className="w-[30%] bg-[#eeeeeed6] rounded-2xl p-3 overflow-y-scroll min-w-[270px] mr-2"
          >
            <Side sidebarFunction={sidebarFunction} />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Page;
