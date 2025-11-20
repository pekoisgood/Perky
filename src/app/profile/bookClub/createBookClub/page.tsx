"use client";

import React, { useState } from "react";
import Link from "next/link";

import { addDoc, collection, serverTimestamp } from "firebase/firestore";

import { fetchMeetingId } from "@/utils/bookClubs/videoSdk";
import { db } from "@/utils/firebase/firebase";
import { CreateBookClub } from "@/utils/types/types";
import { IoMdClose } from "react-icons/io";
import Button from "@/components/Button/Button";
import Warning from "@/components/Warning/Warning";
import { useAppSelector } from "@/redux/hooks";

import Search from "./Search";

const today = `${new Date().getFullYear()}-${
  new Date().getMonth() + 1 < 10
    ? `0${new Date().getMonth() + 1}`
    : new Date().getMonth() + 1
}-${new Date().getDate()}`;

const errorValidatedClass = "border-red-500";

type ErrorValidation = {
  title?: string;
  date?: string;
  hour?: string;
  minute?: string;
};

const Page = () => {
  const [bookClub, setBookClub] = useState<CreateBookClub>({
    title: "",
    date: today,
    hour: "00",
    minute: "00",
    guest: [],
  });
  const [showInvitationError, setShowInvitationError] = useState(false);
  const [isValidForm, setIsValidForm] = useState<
    | boolean
    | null // loading
    | undefined // initial
  >(undefined);
  const [errorValidation, setErrorValidation] = useState<ErrorValidation>({});

  const user = useAppSelector((state) => state.auth.value);

  const [year, month, day] = bookClub.date.split("-").map(Number);
  const hour = Number(bookClub.hour);
  const minute = Number(bookClub.minute);

  const time = new Date(year, month - 1, day, hour, minute);

  function handleValidation() {
    const errorMsg: ErrorValidation = {};
    if (!bookClub.title) {
      errorMsg.title = "Title can't be empty.";
    }

    if (!bookClub.date) {
      errorMsg.date = "Date can't be empty.";
    }

    if (!bookClub.hour) {
      errorMsg.hour = "Hour can't be empty.";
    }

    if (!bookClub.minute) {
      errorMsg.minute = "Minute can't be empty.";
    }

    setErrorValidation(errorMsg);
    return Object.keys(errorMsg).length === 0;
  }

  const handleRemoveGuest = (userIdToBeRemoved: string) => {
    setBookClub((prev) => {
      return {
        ...prev,
        guest: prev.guest.filter((guest) => guest.id !== userIdToBeRemoved),
      };
    });
  };

  const handleCreateBookClub = async () => {
    const isPass = handleValidation();

    if (!isPass) {
      setIsValidForm(false);
      return;
    }
    setIsValidForm(null);

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
    setErrorValidation({});
    return;
  };

  function renderErrorMsg(type: keyof ErrorValidation) {
    if (errorValidation[type]) {
      return (
        <p className="col-start-2 block font-bold text-red-500">
          {errorValidation[type]}
        </p>
      );
    }
    return null;
  }

  return (
    <div className="gap mx-auto mt-[20px] flex h-fit w-full max-w-[600px] flex-col px-[20px] md:w-[60%]">
      <h1 className="mx-auto mb-[30px] w-fit text-center text-[26px] font-semibold sm:indent-[6px] sm:tracking-[6px] ">
        New Book Club
      </h1>
      <div className="flex flex-col gap-[30px]">
        {/* Title */}
        <div className="grid grid-cols-[auto_1fr] items-center gap-x-3 gap-y-2">
          <label className="whitespace-nowrap">Title :</label>
          <input
            value={bookClub.title}
            type="text"
            className={`w-full rounded-2xl border-2 border-dashed px-3 py-2 outline-none focus:border-solid ${
              errorValidation.title ? errorValidatedClass : "border-[#245953]"
            }`}
            onChange={(e) =>
              setBookClub((prev) => ({
                ...prev,
                title: e.target.value,
              }))
            }
          />
          {renderErrorMsg("title")}
        </div>

        {/* Date */}
        <div className="flex items-center gap-3">
          <label className="whitespace-nowrap">Date : </label>
          <input
            type="date"
            className={`rounded-2xl border-2 border-dashed  px-3 py-2 outline-none focus:border-solid  ${errorValidation.date ? errorValidatedClass : "border-[#245953]"}`}
            min={today}
            value={bookClub.date}
            onChange={(e) =>
              setBookClub((prev) => {
                return { ...prev, date: e.target.value };
              })
            }
          />
          {renderErrorMsg("date")}
        </div>
        {/* Time */}
        <div className="flex items-center gap-3">
          <label className="whitespace-nowrap">Time : </label>
          <select
            name="hour"
            className={`rounded-2xl border-2 border-dashed px-3 py-2 outline-none focus:border-solid  ${errorValidation.minute ? errorValidatedClass : "border-[#245953]"}`}
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
            className="rounded-2xl border-2 border-dashed border-[#245953] px-3 py-2 outline-none focus:border-solid"
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
          {renderErrorMsg("minute")}
          {renderErrorMsg("hour")}
        </div>
        {/* Invitation */}
        <div className="flex items-center gap-3">
          <label className="w-fit whitespace-nowrap">Invitation : </label>
          <div className="flex grow flex-col">
            <Search
              setBookClub={setBookClub}
              bookClub={bookClub}
              setShowInvitationError={setShowInvitationError}
            />
            {showInvitationError && (
              <p className="text-[12px] text-rose-300">
                Friend already been added!
              </p>
            )}
          </div>
        </div>
        <div className="flex w-full flex-wrap items-center gap-2">
          <p>Invited Friend : </p>
          {bookClub.guest.map((user) => {
            return (
              <div
                key={user.id}
                className="flex flex-row items-center gap-3 rounded-md border-[1px] border-black bg-orange-300 px-2 py-1 text-black"
              >
                <div className="flex flex-col gap-1 break-all text-[12px] text-black sm:flex-row sm:text-[16px]">
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
      {isValidForm === null && (
        <Warning customCloseButton={true}>Loading</Warning>
      )}
      {isValidForm === true && (
        <Warning
          time={0}
          customHandleCloseButton={() => {
            setIsValidForm(undefined);
            setErrorValidation({});
          }}
        >
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
