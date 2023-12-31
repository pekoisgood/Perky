"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { db } from "@/utils/firebase/firebase";
import {
  DocumentData,
  and,
  collection,
  getDocs,
  or,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { motion } from "framer-motion";

import Button from "@/components/Button/Button";
import BookClubSkeleton from "@/components/Skeleton/BookClubSkeleton";
import { BookClubInfo } from "@/utils/types/types";
import { useAppSelector } from "@/redux/hooks";
import { getTime, nextDate } from "@/utils/date/dateFc";

import { easeAppearContainer } from "../articleRecord/ArticleRecord";

const dashBoardTitleClass =
  "font-medium text-[20px] tracking-[2px] mb-[20px] text-center lg:text-start";

const TodayBookClub = () => {
  const [todayBookClub, setTodayBookClub] = useState<BookClubInfo[] | null>(
    null
  );

  const user = useAppSelector((state) => state.auth.value);

  useEffect(() => {
    const getBookClubList = async () => {
      const year = new Date().getFullYear();
      const month = new Date().getMonth() + 1;
      const day = new Date().getDate();

      const today = new Date(`${year}-${month}-${day}`);
      const tomorrow = nextDate(year, month, day);

      const bookClubRef = query(
        collection(db, "bookClubs"),
        and(
          where("time", ">=", today),
          where("time", "<", tomorrow),
          or(
            where("host", "==", user.id),
            where("guest", "array-contains", user.id)
          )
        ),
        orderBy("time")
      );

      const result = await getDocs(bookClubRef);
      if (result.size === 0) {
        setTodayBookClub([]);
        return;
      }

      const bookClubs: BookClubInfo[] = [];

      result.forEach((doc: DocumentData) => {
        bookClubs.push({ id: doc.id, ...doc.data() });
      });

      setTodayBookClub(bookClubs);
    };
    if (!user.id) return;
    getBookClubList();
  }, [user.id]);

  return (
    <>
      <h4 className={dashBoardTitleClass}>Today&apos;s Book Club</h4>
      {todayBookClub === null ? (
        <div className="w-full h-full flex flex-wrap gap-2 justify-center items-center">
          <BookClubSkeleton />
          <BookClubSkeleton />
          <BookClubSkeleton />
        </div>
      ) : todayBookClub.length > 0 ? (
        <>
          <motion.div
            initial="hidden"
            animate="show"
            variants={easeAppearContainer}
            className="w-full h-full flex flex-wrap gap-2 justify-center items-center"
          >
            {todayBookClub === null && <p className="">Loading</p>}
            {todayBookClub.map((bookClub, index) => {
              return (
                <Link
                  href={`/bookClubMeeting/${bookClub.id}`}
                  key={index}
                  className="border-2 border-black bg-[#245953] text-white p-1 rounded-xl max-w-[200px] hover:translate-y-[-3px] duration-100"
                >
                  <div className="border-dashed border-2 border-white rounded-lg p-3">
                    <p className="text-[16px] lg:text-[18px]">
                      {bookClub.name}
                    </p>
                    <p className="text-[12px] lg:text-[14px]">
                      {getTime(new Date(bookClub.time.seconds * 1000), true)}
                    </p>
                  </div>
                </Link>
              );
            })}
          </motion.div>
          <motion.p
            initial="hidden"
            animate="show"
            variants={easeAppearContainer}
            className="text-[#245953] font-medium mt-auto pt-[20px]"
          >
            Remeber to join the meeting!
          </motion.p>
        </>
      ) : (
        <motion.div
          initial="hidden"
          animate="show"
          variants={easeAppearContainer}
          className="font-medium flex flex-col gap-2 justify-center items-center"
        >
          <p className="text-[#245953]">No Book Club Today...</p>
          <Button>
            <Link href="/profile/bookClub/createBookClub">
              Go to create one!
            </Link>
          </Button>
        </motion.div>
      )}
    </>
  );
};

export default TodayBookClub;
