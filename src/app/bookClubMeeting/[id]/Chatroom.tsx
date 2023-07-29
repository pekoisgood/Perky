"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";

import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { HiPaperAirplane } from "react-icons/hi";
import { PiFinnTheHumanFill } from "react-icons/pi";
import { Message } from "@/utils/types/types";
import { db } from "@/utils/firebase/firebase";
import { useAppSelector } from "@/redux/hooks";

const Chatroom = ({
  newMessage,
  setNewMessage,
}: {
  newMessage: string;
  setNewMessage: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const chatRoomMessagesRef = useRef<HTMLDivElement | null>(null);

  const user = useAppSelector((state) => state.auth.value);

  const params = useParams();
  const roomId = params.id;
  const messagesRef = collection(db, "bookClubs", roomId, "messages");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newMessage) return;

    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: user.name,
      userId: user.id,
      avatar: user.avatar,
      room: roomId,
    });

    setNewMessage("");
  };

  useEffect(() => {
    const queryMessages = query(messagesRef, orderBy("createdAt"));
    const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
      console.log("fetch!!");

      const messages: Message[] = [];
      snapshot.forEach((doc) => {
        messages.push({
          user: doc.data().user,
          room: doc.data().room,
          text: doc.data().text,
          createdAt: doc.data().createdAt,
          id: doc.id,
          userId: doc.data().userId,
          avatar: doc.data().avatar,
        });
      });

      if (!chatRoomMessagesRef.current) return;
      chatRoomMessagesRef.current.scrollTop =
        chatRoomMessagesRef.current.scrollHeight;

      setMessages(messages);
    });

    return () => {
      unsuscribe();
    };
  }, []);

  return (
    <div className="min-h-full h-full relative rounded-xl p-2">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col h-full relative"
      >
        <div
          ref={chatRoomMessagesRef}
          className={`flex flex-col gap-[18px] h-full w-full p-2 pb-[42px] 
          overflow-y-scroll grow  border-[1px] border-black bg-orange-50 rounded-lg`}
        >
          {messages.map((message, index) => {
            return message.userId === user.id ? (
              <div
                className="flex flex-col w-fit ml-auto items-end"
                key={index}
              >
                <p className="text-[10px] pr-[6px]">{message.user}</p>
                <p
                  className="bg-[#9575DE] border-black border-[1px] rounded-full px-[16px] tracking-[1px] text-[14px]
              shadow-black shadow-[3px_3px] py-1 w-fit text-white"
                >
                  {message.text}
                </p>
              </div>
            ) : (
              <div
                className="flex gap-1 w-fit min-w-[32px] mr-auto justify-start items-center"
                key={index}
              >
                {message.avatar ? (
                  <Image
                    src={message.avatar}
                    alt="user avatar"
                    width={32}
                    height={32}
                    className="rounded-full border-[1px] border-black overflow-hidden h-[32px] w-[32px] object-cover"
                  />
                ) : (
                  <PiFinnTheHumanFill />
                )}
                <div>
                  <p className="text-[12px]">
                    {message.user === "" ? "Demo" : message.user}
                  </p>
                  <p
                    className="bg-[#9575DE] border-black border-[1px] rounded-full px-[16px] tracking-[1px] text-[14px]
          shadow-black shadow-[3px_3px] py-1 w-fit text-white text-center"
                  >
                    {message.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex gap-1 p-1 items-center w-full">
          <input
            className={`flex w-full text-[15px] text-black tracking-[1px] rounded-lg border-[1px] border-black 
            py-1 px-2 bg-orange-50 outline-none placeholder:text-black focus:border-transparent`}
            placeholder="Type message here..."
            onChange={(e) => setNewMessage(e.target.value)}
            value={newMessage}
          />
          <button
            type="submit"
            className="scale-100 hover:scale-105 focus:scale-95"
          >
            <HiPaperAirplane size={20} className="rotate-90" />
          </button>
        </div>
      </form>
      {/* <div className="flex gap-1 p-1 items-center absolute bottom-[-2px] right-[50%] translate-x-[50%]"> */}
    </div>
  );
};

export default Chatroom;
