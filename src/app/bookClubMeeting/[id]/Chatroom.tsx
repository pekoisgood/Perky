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
  Firestore,
} from "firebase/firestore";
import { HiPaperAirplane, HiOutlineChatAlt2 } from "react-icons/hi";
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

  const params = useParams<{ id: string }>();
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
    <div className="relative h-full min-h-full rounded-xl p-2">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="relative flex h-full flex-col"
      >
        <div
          ref={chatRoomMessagesRef}
          className={`flex h-full w-full grow flex-col gap-[18px] overflow-y-scroll 
          rounded-lg border-[1px]  border-black bg-orange-50 p-2 pb-[42px]`}
        >
          {messages.length > 0 ? (
            messages.map((message, index) => {
              return message.userId === user.id ? (
                <div
                  className="ml-auto flex w-fit flex-col items-end"
                  key={index}
                >
                  <p className="pr-[6px] text-[10px]">{message.user}</p>
                  <p
                    className="w-fit rounded-xl border-[1px] border-black bg-[#9575DE] px-[16px] py-1
              text-[14px] tracking-[1px] text-white shadow-[3px_3px] shadow-black"
                  >
                    {message.text}
                  </p>
                </div>
              ) : (
                <div
                  className="mr-auto flex w-fit min-w-[32px] items-center justify-start gap-1"
                  key={index}
                >
                  {message.avatar ? (
                    <Image
                      src={message.avatar}
                      alt="user avatar"
                      width={32}
                      height={32}
                      className="h-[32px] w-[32px] overflow-hidden rounded-full border-[1px] border-black object-cover"
                    />
                  ) : (
                    <PiFinnTheHumanFill />
                  )}
                  <div>
                    <p className="text-[12px]">
                      {message.user === "" ? "Demo" : message.user}
                    </p>
                    <p
                      className="w-fit rounded-xl border-[1px] border-black bg-[#9575DE] px-[16px] py-1
          text-[14px] tracking-[1px] text-white shadow-[3px_3px] shadow-black"
                    >
                      {message.text}
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-[#9c9b9b]">
              <HiOutlineChatAlt2 size={25} />
              <p>Say hi to everyone !</p>
            </div>
          )}
        </div>
        <div className="flex w-full items-center gap-1 p-1">
          <input
            className={`flex w-full rounded-lg border-[1px] border-black bg-orange-50 px-2 py-1 
            text-[15px] tracking-[1px] text-black outline-none placeholder:text-black focus:border-transparent`}
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
    </div>
  );
};

export default Chatroom;
