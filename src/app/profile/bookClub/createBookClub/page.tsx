"use client";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React, { useState, useRef, useEffect, useContext } from "react";
import { fetchMeetingId } from "@/utils/videoSdk";
import { db } from "@/utils/firebase";
import { AuthContext } from "@/context/AuthContext";

type CreateBookClub = {
  name: string;
  date: string;
  time: string;
  guest: string[];
};

const Page = () => {
  const { user } = useContext(AuthContext);
  const [bookClub, setBookClub] = useState<CreateBookClub>({
    name: "",
    date: "",
    time: "",
    guest: [],
  });

  const guestRef = useRef<HTMLInputElement | null>(null);
  const handleAddGuest = () => {
    if (!guestRef || !guestRef.current || guestRef.current.value === "") return;
    if (bookClub.guest.find((userId) => userId === guestRef.current!.value)) {
      window.alert("已加入此使用者！");
      return;
    }
    setBookClub((prev) => {
      return { ...prev, guest: [...prev.guest, guestRef.current!.value] };
    });
  };

  const handleRemoveGuest = (userIdTobeRomved: string) => {
    setBookClub((prev) => {
      return {
        ...prev,
        guest: prev.guest.filter((userId) => userId !== userIdTobeRomved),
      };
    });
  };

  const handleCreateBookClub = async () => {
    const time = new Date(bookClub.date + " " + bookClub.time);
    const isValidTime = time > new Date();

    if (!bookClub.date || !bookClub.time || !bookClub.name || !isValidTime) {
      window.alert("請將內容填寫完整");
      return;
    }

    const roomId = await fetchMeetingId();
    const data = {
      name: bookClub.name,
      time,
      guest: bookClub.guest,
      host: user.id,
      createdAt: serverTimestamp(),
      roomId,
      attendees: [],
    };
    const bookClubRef = collection(db, "bookClubs");
    const docRef = await addDoc(bookClubRef, data);
    window.alert("讀書會創立成功！");
    return docRef.id;
  };

  useEffect(() => {
    if (!guestRef || !guestRef.current) return;
    guestRef.current.value = "";
  }, [bookClub.guest]);

  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <h1 className="text-bold text-[25px] mt-[30px]">創立讀書會</h1>
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-3">
          <label>讀書會名稱 : </label>
          <input
            type="text"
            className="border-slate-400 border-[1px] px-2 py-1 rounded-lg"
            onChange={(e) =>
              setBookClub((prev) => {
                return {
                  ...prev,
                  name: e.target.value,
                };
              })
            }
          />
        </div>
        <div className="flex items-center gap-3">
          <label>日期 : </label>
          <input
            type="date"
            className="border-slate-400 border-[1px] px-2 py-1 rounded-lg"
            onChange={(e) =>
              setBookClub((prev) => {
                return { ...prev, date: e.target.value };
              })
            }
          />
        </div>
        <div className="flex items-center gap-3">
          <label>時間 : </label>
          <input
            type="time"
            className="border-slate-400 border-[1px] px-2 py-1 rounded-lg"
            onChange={(e) =>
              setBookClub((prev) => {
                return { ...prev, time: e.target.value };
              })
            }
          />
        </div>
        <div className="flex items-center gap-3">
          <label>邀請朋友加入 : </label>
          <input
            type="text"
            ref={guestRef}
            placeholder="輸入使用者id"
            className="border-slate-400 border-[1px] px-2 py-1 rounded-lg"
          />
          <div onClick={handleAddGuest}>新增</div>
        </div>
        <div className="flex gap-2">
          <p>已加入讀書會成員 : </p>
          {bookClub.guest.map((userId) => {
            return (
              <div
                key={userId}
                className="px-2 py-1 bg-sky-500/75 rounded-md flex gap-3 items-center"
              >
                <p className="text-white">{userId}</p>
                <span
                  className="hover:cursor-pointer"
                  onClick={() => handleRemoveGuest(userId)}
                >
                  x
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <button
        className="px-2 py-1 bg-slate-300 rounded-md w-fit ml-auto"
        onClick={handleCreateBookClub}
      >
        點我新增讀書會
      </button>
    </div>
  );
};

export default Page;
