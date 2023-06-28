"use client";

import { db } from "@/utils/firebase";
import {
  Timestamp,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useAppSelector } from "@/redux/hooks";

type bookClub = {
  id: string;
  roomId: string;
  name: string;
  time: Timestamp;
  createdAt: Timestamp;
};

const BookClubList = () => {
  const date = useAppSelector((state) => state.calender.value);
  const [bookClubs, setBookClubs] = useState<bookClub[] | []>([]);

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
        where("guest", "array-contains", "Peko"),
        where("time", ">=", dateToday),
        where("time", "<", nextDate(year, month, day))
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
    <div className="w-fit">
      <div className="grid grid-cols-2 gap-5 mt-4">
        {bookClubs.length > 0 &&
          bookClubs.map((bookClub, index) => {
            return (
              <Link
                key={index}
                href={`bookClub/:${bookClub.id}`}
                className="p-4 border-solid border-slate-600 border-[1px] rounded-lg flex flex-col gap-2"
              >
                <h3 className="text-[16px]">{bookClub.name}</h3>
                <p className="text-[12px]">
                  時間：{bookClub.time.toDate().toLocaleString()}
                </p>
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default BookClubList;
