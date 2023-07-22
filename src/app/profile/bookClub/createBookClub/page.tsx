"use client";

import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React, { useState, useContext } from "react";
import { fetchMeetingId } from "@/utils/bookClubs/videoSdk";
import { db } from "@/utils/firebase/firebase";
import { AuthContext } from "@/context/AuthContext";
import { IoMdClose } from "react-icons/io";
import { PiWarningFill } from "react-icons/pi";
import Button from "@/components/button/Button";
import Warning from "../../../../components/warning/Warning";
import Link from "next/link";
import Search from "./Search";

type CreateBookClub = {
  title: string;
  date: string;
  hour: string;
  minute: string;
  guest: Guest[];
};

type Guest = {
  name: string;
  id: string;
};

const getMonth = () => {
  const thisMonth = new Date().getMonth() + 1;
  if (thisMonth < 10) {
    return `0${thisMonth}`;
  }
  return thisMonth;
};

const today = `${new Date().getFullYear()}-${getMonth()}-${new Date().getDate()}`;

const Page = () => {
  const { user } = useContext(AuthContext);
  const [bookClub, setBookClub] = useState<CreateBookClub>({
    title: "",
    date: today,
    hour: "",
    minute: "00",
    guest: [],
  });
  const [showInvationError, setShowInvationError] = useState(false);
  const [isValidForm, setIsValidForm] = useState<boolean | null>(null);

  const time = new Date(
    bookClub.date + " " + bookClub.hour + ":" + bookClub.minute
  );
  const isValidTime = time > new Date();

  const handleRemoveGuest = (userIdTobeRomved: string) => {
    setBookClub((prev) => {
      return {
        ...prev,
        guest: prev.guest.filter((guest) => guest.id !== userIdTobeRomved),
      };
    });
  };

  const errorMessage = () => {
    const titleMessage = "Title can't be empty.";
    const dateMessage = "Date can't be empty.";
    const timeMessage = "Time can't be empty.";
    const validDateMessage = "Date or time should be in the future.";
    const messages = [];

    if (!bookClub.title) {
      messages.push(titleMessage);
    }
    if (!bookClub.date) {
      messages.push(dateMessage);
    }
    if (!bookClub.hour || !bookClub.minute) {
      messages.push(timeMessage);
    }
    if (!isValidTime && bookClub.date) {
      messages.push(validDateMessage);
    }

    return (
      <ul className="flex flex-col gap-2">
        <PiWarningFill size={35} className="w-fit mx-auto" />
        {messages.map((m, i) => {
          return (
            <li
              key={i}
              className="list-disc text-[12px] sm:text-[16px] lg:text-[20px]"
            >
              {m}
            </li>
          );
        })}
      </ul>
    );
  };

  const handleCreateBookClub = async () => {
    if (
      !bookClub.date ||
      !bookClub.hour ||
      !bookClub.minute ||
      !bookClub.title ||
      !isValidTime
    ) {
      setIsValidForm(false);

      setTimeout(() => {
        setIsValidForm(null);
      }, 3000);
      return;
    }

    const roomId = await fetchMeetingId();
    const data = {
      name: bookClub.title,
      time,
      guest: [...bookClub.guest.map((guest) => guest.id), user.id],
      host: user.id,
      createdAt: serverTimestamp(),
      roomId,
      attendees: [],
    };
    const bookClubRef = collection(db, "bookClubs");
    await addDoc(bookClubRef, data);

    setIsValidForm(true);
    return;
  };

  console.log(bookClub);

  return (
    <div className="flex flex-col gap max-w-[600px] w-[60%] mt-[20px] mx-auto">
      <h1 className="mx-auto w-fit text-[28px] font-semibold tracking-[6px] indent-[6px] mb-[30px]">
        New Book Club
      </h1>
      <div className="flex flex-col gap-[30px]">
        <div className="flex items-center gap-3">
          <label className="w-fit">Title : </label>
          <input
            value={bookClub.title}
            type="text"
            className="outline-none grow px-3 py-2 border-dashed border-2 border-[#245953] rounded-2xl focus:border-solid"
            onChange={(e) =>
              setBookClub((prev) => {
                return {
                  ...prev,
                  title: e.target.value,
                };
              })
            }
          />
        </div>
        <div className="flex items-center gap-3">
          <label>Date : </label>
          <input
            type="date"
            className="outline-none px-3 py-2 border-dashed border-2 border-[#245953] rounded-2xl focus:border-solid"
            min={today}
            value={bookClub.date}
            onChange={(e) =>
              setBookClub((prev) => {
                return { ...prev, date: e.target.value };
              })
            }
          />
        </div>
        <div className="flex items-center gap-3">
          <label>Time : </label>
          <select
            name="hour"
            className="outline-none px-3 py-2 border-dashed border-2 border-[#245953] rounded-2xl focus:border-solid"
            onChange={(e) =>
              setBookClub((prev) => {
                return { ...prev, hour: e.target.value };
              })
            }
          >
            {new Array(24).fill("").map((_, index) => {
              return (
                <option key={index} value={index < 10 ? "0" + index : index}>
                  {index < 10 ? "0" + index : index}
                </option>
              );
            })}
          </select>
          <span>:</span>
          <select
            name="minute"
            className="outline-none px-3 py-2 border-dashed border-2 border-[#245953] rounded-2xl focus:border-solid"
            onChange={(e) =>
              setBookClub((prev) => {
                return { ...prev, minute: e.target.value };
              })
            }
          >
            {new Array(60).fill("").map((_, index) => {
              return (
                <option key={index} value={index < 10 ? "0" + index : index}>
                  {index < 10 ? "0" + index : index}
                </option>
              );
            })}
          </select>
        </div>
        <div className="flex items-center gap-3">
          <label className="w-fit">Invitation : </label>
          <div className="flex flex-col grow">
            <Search
              setBookClub={setBookClub}
              bookClub={bookClub}
              setShowInvationError={setShowInvationError}
            />
            {showInvationError && (
              <p className="text-rose-300 text-[12px]">
                Friend already been added!
              </p>
            )}
          </div>
        </div>
        <div className="flex gap-2 flex-wrap items-center w-full">
          <p>Invited Friend : </p>
          {bookClub.guest.map((user) => {
            return (
              <div
                key={user.id}
                className="px-2 py-1 bg-orange-300 text-black border-[1px] border-black rounded-md flex gap-3 items-center "
              >
                <p className="text-black">{user.name}</p>
                <span
                  className="hover:cursor-pointer"
                  onClick={() => handleRemoveGuest(user.id)}
                >
                  <IoMdClose />
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <Button
        customLayout="ml-auto mt-[20px]"
        handleOnClick={() => handleCreateBookClub()}
      >
        Create
      </Button>
      {isValidForm === false && <Warning time={5000}>{errorMessage()}</Warning>}
      {isValidForm === true && (
        <Warning time={0}>
          <div className="flex flex-col gap-3">
            <p>Successfully Create Book Club !</p>
            <Link href="/">
              <Button>See more articles</Button>
            </Link>
            <Link href="/profile/bookClub">
              <Button>See my book club schedule</Button>
            </Link>
          </div>
        </Warning>
      )}
    </div>
  );
};

export default Page;
