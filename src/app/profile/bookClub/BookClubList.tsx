"use client";

import { db } from "@/utils/firebase";
import {
  Timestamp,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { useAppSelector } from "@/redux/hooks";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { AuthContext } from "@/context/AuthContext";

type bookClub = {
  id: string;
  roomId: string;
  name: string;
  time: Timestamp;
  createdAt: Timestamp;
};

const BookClubList = () => {
  const { user } = useContext(AuthContext);
  const date = useAppSelector((state) => state.calender.value);
  const [bookClubs, setBookClubs] = useState<bookClub[] | []>([]);
  const [isCheckNote, setIsCheckNote] = useState<boolean>(false);
  const [note, setNote] = useState<string>("");

  const getNote = async (articleId: string) => {
    const result = await getDoc(
      doc(db, "users", user.id, "bookClubNotes", articleId)
    );
    const note = await result!.data();
    if (!note) return;
    setNote(note.note);
    setIsCheckNote(true);
  };

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
        where("guest", "array-contains", user.id),
        where("time", ">=", dateToday),
        where("time", "<", nextDate(year, month, day))
      );

      const bookClubs = await getDocs(bookClubRef);
      bookClubs.forEach((doc) => {
        console.log(doc.data().time.toDate() < new Date());

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
              <div
                key={index}
                className="p-4 border-solid border-slate-600 border-[1px] rounded-lg flex flex-col gap-2"
              >
                <h3 className="text-[16px]">{bookClub.name}</h3>
                <p className="text-[12px]">
                  時間：{bookClub.time.toDate().toLocaleString()}
                </p>
                <div className="flex gap-2">
                  <Link
                    href={
                      bookClub.time.toDate() < new Date()
                        ? ""
                        : `bookClub/${bookClub.id}`
                    }
                    className={`${
                      bookClub.time.toDate() < new Date() &&
                      "hover:cursor-not-allowed bg-slate-300"
                    } p-1 rounded-lg bg-sky-100 text-[12px]`}
                  >
                    點我進入
                  </Link>
                  <div
                    onClick={() => getNote(bookClub.id)}
                    className="p-1 rounded-lg bg-sky-100 text-[12px]"
                  >
                    查看筆記
                  </div>
                </div>
                {isCheckNote && note && (
                  <div className="border-2 border-sky-500 absolute top-0 left-0 w-full h-full bg-sky-50/95 flex flex-col items-center justify-center">
                    <button onClick={() => setIsCheckNote(false)}>close</button>
                    <ReactMarkdown>{note}</ReactMarkdown>
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default BookClubList;
