"use client";

import { BookClub, db } from "@/utils/firebase";
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
import { useContext, useEffect, useState } from "react";
// import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { AuthContext } from "@/context/AuthContext";
import { dashBoardTitleClass } from "../page";
import Link from "next/link";

const TodayBookClub = () => {
  const { user } = useContext(AuthContext);
  const [todayBookClub, setTodayBookClub] = useState<BookClub[] | null>(null);

  useEffect(() => {
    const getBookClubList = async () => {
      const year = new Date().getFullYear();
      const month = new Date().getMonth() + 1;
      const day = new Date().getDate();

      const today = new Date(`${year}-${month}-${day}`);
      const tomorrow = new Date(`${year}-${month}-${day + 1}`);

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
      if (result.size === 0) return;

      const bookClubs: BookClub[] = [];
      console.log(result);

      result.forEach((doc: DocumentData) => {
        console.log("result: ", doc.data());
        bookClubs.push(doc.data());
      });
      console.log(bookClubs);

      setTodayBookClub(bookClubs);
    };
    getBookClubList();
  }, [user.id]);

  if (todayBookClub === null) return <p>Loading...</p>;

  return (
    <>
      <h4 className={dashBoardTitleClass}>Today&apos;s Book Club</h4>
      {todayBookClub.length > 0 ? (
        <>
          <div className="w-full h-full flex flex-col flex-wrap gap-2 justify-center items-center">
            {todayBookClub === null && <p className="">Loading</p>}
            {todayBookClub.map((bookClub, index) => {
              return (
                <Link
                  href={`/bookClubMeeting/${bookClub.roomId}`}
                  key={index}
                  className="border-2 border-black bg-[#245953] text-white p-1 rounded-xl max-w-[200px] hover:translate-y-[-3px] duration-100"
                >
                  <div className="border-dashed border-2 border-white rounded-lg p-3">
                    <p className="text-[16px] lg:text-[18px]">
                      {bookClub.name}
                    </p>
                    <p className="text-[12px] lg:text-[14px]">
                      {new Date(bookClub.time.seconds * 1000).toLocaleString()}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
          <p className="text-[#245953] font-medium mt-auto pt-[20px]">
            Remeber to joing the meeting!
          </p>
        </>
      ) : (
        <p>No Book Club Today...</p>
      )}
    </>
  );
};

export default TodayBookClub;
