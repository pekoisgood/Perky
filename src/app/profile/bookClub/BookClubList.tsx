"use client";

import { db } from "@/utils/firebase";
import {
  Timestamp,
  and,
  collection,
  doc,
  getDoc,
  getDocs,
  or,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { useAppSelector } from "@/redux/hooks";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";
import { AuthContext } from "@/context/AuthContext";
import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";

type bookClub = {
  id: string;
  roomId: string;
  name: string;
  time: Timestamp;
  createdAt: Timestamp;
};

const container = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
  },
  transition: {
    type: "ease",
    stiffness: 120,
    delayChildren: 1,
    staggerChildren: 0.5,
  },
};

const child = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    x: [500, -100, 0, 10, 0],
  },
  transition: {
    type: "tween",
    ease: "linear",
    stiffness: 150,
    duration: 2,
  },
};

const BookClubList = () => {
  const { user } = useContext(AuthContext);
  const date = useAppSelector((state) => state.calender.value);
  const [bookClubs, setBookClubs] = useState<bookClub[] | []>([]);
  const [isPreviewNote, setIsPreviewNote] = useState<boolean>(false);
  const [note, setNote] = useState<string | null>(null);

  const getNote = async (bookClubId: string) => {
    setIsPreviewNote(true);
    const result = await getDoc(
      doc(db, "users", user.id, "bookClubNotes", bookClubId)
    );
    const note = await result!.data();
    if (!note) {
      setNote("");
      return;
    }

    setNote(note.note);
  };

  console.log("note: ", note);

  useEffect(() => {
    const getBookClubList = async () => {
      setBookClubs([]);
      const year = date.year;
      const month = date.month;
      const day = date.date;
      const dateToday = new Date(`${year}-${month}-${day}`);
      function nextDate(y: number, m: number, d: number) {
        if (
          (m === 2 && y % 4 === 0 && d === 29) ||
          (m === 2 && y % 4 === 0 && d === 28) ||
          (m % 2 === 0 && d === 30) ||
          d === 31
        ) {
          if (m === 12) {
            return new Date(`${y}-${1}-${1}`);
          }
          return new Date(`${y}-${m + 1}-${1}`);
        }
        return new Date(`${y}-${m}-${d + 1}`);
      }

      const bookClubRef = query(
        collection(db, "bookClubs"),
        and(
          where("time", ">=", dateToday),
          where("time", "<", nextDate(year, month, day)),

          or(
            where("host", "==", user.id),
            where("guest", "array-contains", user.id)
          )
        ),
        orderBy("time")
      );

      const bookClubs = await getDocs(bookClubRef);
      bookClubs.forEach((doc) => {
        setBookClubs((prev) => [
          ...prev,
          {
            id: doc.id,
            roomId: doc.data().roomId,
            name: doc.data().name,
            time: doc.data().time,
            createdAt: doc.data().createdAt,
          },
        ]);
      });
    };
    getBookClubList();
  }, [date]);

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mt-4"
      initial="hidden"
      animate="show"
      variants={container}
    >
      {bookClubs.length > 0 &&
        bookClubs.map((bookClub, index) => {
          return (
            <motion.div
              key={index}
              variants={child}
              whileHover={{ y: -10 }}
              className="p-1 border-solid rounded-xl bg-[#245953] text-white"
            >
              <div className="flex flex-col p-4 gap-2 justify-center items-center border-dashed border-2 border-white rounded-lg">
                <h3 className="text-[16px] text-white font-bold">
                  {bookClub.name}
                </h3>
                <p className="text-[12px]">
                  {bookClub.time.toDate().toLocaleString()}
                </p>
                <div className="flex gap-2 justify-center text-black">
                  <Link
                    href={
                      bookClub.time.toDate() < new Date()
                        ? ""
                        : `/bookClubMeeting/${bookClub.id}`
                    }
                    className={`${
                      bookClub.time.toDate() < new Date() &&
                      "hover:cursor-not-allowed "
                    } w-[40px] text-center p-1 rounded-lg bg-[#F0EB8D] text-[12px]`}
                  >
                    Join
                  </Link>
                  <div
                    onClick={() => getNote(bookClub.id)}
                    className="text-center w-[40px] p-1 rounded-lg bg-[#F0EB8D] text-[12px] hover:cursor-pointer"
                  >
                    Note
                  </div>
                </div>
                {isPreviewNote && note === "" && (
                  <p className="text-[12px] text-red-400">
                    You didn't take note!
                  </p>
                )}
              </div>
            </motion.div>
          );
        })}

      {isPreviewNote && note && (
        <div className="absolute top-0 left-0 w-full h-full backdrop-blur-sm">
          <div
            className={`flex flex-col px-[20px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[400px] h-[400px] 
          bg-white/90 backdrop-blur-md rounded-xl border-[#245953] border-2 shadow-md overflow-y-scroll`}
          >
            <button
              className="w-fit ml-auto text-red-500 mt-[10px]"
              onClick={() => setIsPreviewNote(false)}
            >
              x
            </button>
            <ReactMarkdown>{note}</ReactMarkdown>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default BookClubList;
