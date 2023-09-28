"use client";

import React, { useState } from "react";
import Link from "next/link";

import { addDoc, collection, serverTimestamp } from "firebase/firestore";

import { fetchMeetingId } from "@/utils/bookClubs/videoSdk";
import { db } from "@/utils/firebase/firebase";
import { CreateBookClub } from "@/utils/types/types";
import { IoMdClose } from "react-icons/io";
import { PiWarningFill } from "react-icons/pi";
import Button from "@/components/Button/Button";
import Warning from "@/components/Warning/Warning";
import { useAppSelector } from "@/redux/hooks";

import Search from "./Search";

const today = `${new Date().getFullYear()}-${
  new Date().getMonth() + 1 < 10
    ? `0${new Date().getMonth() + 1}`
    : new Date().getMonth() + 1
}-${new Date().getDate()}`;

const errorMessage = (bookClub: CreateBookClub, time: Date, now: Date) => {
  const isValidTime = time > now;

  const messages = [
    !bookClub.title && "Title can't be empty.",
    !bookClub.date && "Date can't be empty.",
    (!bookClub.hour || !bookClub.minute) && "Time can't be empty.",
    !isValidTime && bookClub.date && "Date or time should be in the future.",
  ].filter(Boolean);

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

const Page = () => {
  const [bookClub, setBookClub] = useState<CreateBookClub>({
    title: "",
    date: today,
    hour: "",
    minute: "00",
    guest: [],
  });
  const [showInvationError, setShowInvationError] = useState(false);
  const [isValidForm, setIsValidForm] = useState<boolean | null>(null);

  const user = useAppSelector((state) => state.auth.value);

  const time = new Date(
    bookClub.date + " " + bookClub.hour + ":" + bookClub.minute
  );

  const handleRemoveGuest = (userIdTobeRomved: string) => {
    setBookClub((prev) => {
      return {
        ...prev,
        guest: prev.guest.filter((guest) => guest.id !== userIdTobeRomved),
      };
    });
  };

  const handleCreateBookClub = async () => {
    const isValidTime = time > new Date();

    const isValidForm =
      !bookClub.date ||
      !bookClub.hour ||
      !bookClub.minute ||
      !bookClub.title ||
      !isValidTime;

    if (isValidForm) {
      setIsValidForm(false);

      setTimeout(() => {
        setIsValidForm(null);
      }, 3000);
      return;
    }

    const roomId = await fetchMeetingId();
    console.log(roomId);

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

  return (
    <div className="flex flex-col gap max-w-[600px] w-full h-fit px-[20px] md:w-[60%] mt-[20px] mx-auto">
      <h1 className="mx-auto w-fit text-[26px] font-semibold sm:tracking-[6px] sm:indent-[6px] mb-[30px] text-center ">
        New Book Club
      </h1>
      <div className="flex flex-col gap-[30px]">
        <div className="flex items-center gap-3">
          <label className="w-fit whitespace-nowrap">Title : </label>
          <input
            value={bookClub.title}
            type="text"
            className="w-full outline-none grow px-3 py-2 border-dashed border-2 border-[#245953] rounded-2xl focus:border-solid"
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
          <label className="whitespace-nowrap">Date : </label>
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
          <label className="whitespace-nowrap">Time : </label>
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
          <label className="w-fit whitespace-nowrap">Invitation : </label>
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
                className="px-2 py-1 bg-orange-300 text-black border-[1px] border-black rounded-md flex flex-row gap-3 items-center"
              >
                <div className="flex flex-col gap-1 sm:flex-row text-black break-all text-[12px] sm:text-[16px]">
                  <p>{user.name}</p>
                  <p>({user.email})</p>
                </div>

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
      {isValidForm === false && (
        <Warning time={5000}>
          {errorMessage(bookClub, time, new Date())}
        </Warning>
      )}
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
