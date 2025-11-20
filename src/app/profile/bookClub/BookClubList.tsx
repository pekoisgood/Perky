"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
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
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { motion } from "framer-motion";

import { db } from "@/utils/firebase/firebase";
import { BookClubInfo, Note } from "@/utils/types/types";
import BookClubSkeleton from "@/components/Skeleton/BookClubSkeleton";
import { useAppSelector } from "@/redux/hooks";
import { getTime, getUTCDateRange } from "@/utils/date/dateFc";

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
    x: [500, -35, 0, 10, 0],
  },
  transition: {
    type: "tween",
    ease: "linear",
    stiffness: 150,
    duration: 2,
  },
};

const BookClubList = () => {
  const [bookClubs, setBookClubs] = useState<BookClubInfo[] | null>(null);
  const [isPreviewNote, setIsPreviewNote] = useState<boolean>(false);
  const [note, setNote] = useState<Note | null>(null);

  const user = useAppSelector((state) => state.auth.value);
  const date = useAppSelector((state) => state.calender.value);

  const getBookClubList = async () => {
    setBookClubs([]);
    const year = date.year;
    const month = date.month;
    const day = date.date;

    const { utcStart, utcEnd } = getUTCDateRange(year, month, day);

    const bookClubRef = query(
      collection(db, "bookClubs"),
      and(
        where("time", ">=", utcStart),
        where("time", "<", utcEnd),
        or(
          where("host", "==", user.id),
          where("guest", "array-contains", user.id),
        ),
      ),
      orderBy("time"),
    );

    const result = await getDocs(bookClubRef);

    if (result.empty) {
      setBookClubs([]);
      return;
    }
    const bookClubs: BookClubInfo[] = [];

    result.forEach((doc) => {
      bookClubs.push({
        id: doc.id,
        roomId: doc.data().roomId,
        name: doc.data().name,
        time: doc.data().time,
        createdAt: doc.data().createdAt,
      });
    });
    setBookClubs(bookClubs);
  };

  const getNote = async (bookClubId: string) => {
    setIsPreviewNote(true);

    const result = await getDoc(
      doc(db, "users", user.id, "bookClubNotes", bookClubId),
    );
    const note = await result.data();

    if (!note) {
      setNote({
        id: bookClubId,
        note: "",
      });
      return;
    }

    setNote({ id: bookClubId, note: note.note });
  };

  useEffect(() => {
    if (!user.id) return;

    getBookClubList();
  }, [date, user.id]);

  return (
    <>
      <motion.div
        className="relative mt-4 grid w-full grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3"
        initial="hidden"
        animate="show"
        variants={container}
      >
        {bookClubs === null ? (
          <>
            <BookClubSkeleton />
            <BookClubSkeleton />
            <BookClubSkeleton />
          </>
        ) : bookClubs.length > 0 ? (
          bookClubs.map((bookClub, index) => {
            return (
              <motion.div
                key={index}
                variants={child}
                whileHover={{ y: -10 }}
                className="mx-auto h-fit w-fit rounded-xl border-solid bg-[#245953] p-1 text-white md:w-full"
              >
                <div className="flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-white p-4">
                  <h3 className="text-[16px] font-bold text-white">
                    {bookClub.name}
                  </h3>
                  <p className="text-[14px]">
                    {getTime(new Date(bookClub.time.seconds * 1000), true)}
                  </p>
                  <div className="flex justify-center gap-2 text-black">
                    <Link
                      href={
                        bookClub.time.toDate() < new Date()
                          ? ""
                          : `/bookClubMeeting/${bookClub.id}`
                      }
                      className={`${
                        bookClub.time.toDate() < new Date() &&
                        "hover:cursor-not-allowed "
                      } w-[40px] rounded-lg bg-[#F0EB8D] p-1 text-center text-[12px]`}
                    >
                      Join
                    </Link>
                    <div
                      onClick={() => getNote(bookClub.id)}
                      className="w-[40px] rounded-lg bg-[#F0EB8D] p-1 text-center text-[12px] hover:cursor-pointer"
                    >
                      Note
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })
        ) : (
          <p className="col-span-2 w-full text-center font-medium text-[#245953] md:text-start">
            No book club this day... Go join one!
          </p>
        )}
      </motion.div>
      {isPreviewNote && note && (
        <div className="absolute left-0 top-0 h-[98%] w-full">
          <div
            className={`absolute left-[50%] top-[49%] z-[21] flex h-[99%] w-full translate-x-[-50%] translate-y-[-50%] flex-col
          overflow-y-scroll rounded-xl border-2 border-[#245953] bg-white/90 px-[20px] shadow-md backdrop-blur-md`}
          >
            <button
              className="ml-auto mt-[10px] w-fit"
              onClick={() => {
                setIsPreviewNote(false);
                setNote(null);
              }}
            >
              x
            </button>
            {note.note === "" ? (
              <p className="text-[12px] text-red-400">
                You didn&apos;t take note!
              </p>
            ) : (
              <ReactMarkdown>{note.note}</ReactMarkdown>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default BookClubList;
