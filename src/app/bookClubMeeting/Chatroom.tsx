"use client";
import { useState, useEffect, useRef, useContext } from "react";
import React from "react";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  orderBy,
  onSnapshot,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/utils/firebase";
import { AuthContext } from "@/context/AuthContext";

type Message = {
  user: string;
  text: string;
  room: string;
  createdAt: Timestamp;
  id: string;
  userId: string;
};

const Chatroom = ({
  newMessage,
  setNewMessage,
}: {
  newMessage: string;
  setNewMessage: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesRef = collection(db, "messages");
  const chatRoomMessagesRef = useRef<HTMLDivElement | null>(null);

  const roomId = "testRoom";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newMessage) return;

    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: user.name,
      userId: user.id,
      room: roomId,
    });

    setNewMessage("");
  };

  useEffect(() => {
    const queryMessages = query(
      messagesRef,
      where("room", "==", roomId),
      orderBy("createdAt")
    );
    const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages: Message[] = [];
      snapshot.forEach((doc) => {
        messages.push({
          user: doc.data().user,
          room: doc.data().room,
          text: doc.data().text,
          createdAt: doc.data().createdAt,
          id: doc.id,
          userId: doc.data().userId,
        });
      });

      if (!chatRoomMessagesRef.current) return;
      chatRoomMessagesRef.current.scrollTop =
        chatRoomMessagesRef.current.scrollHeight;

      setMessages(messages);
    });

    return () => unsuscribe();
  }, []);

  return (
    <div className="h-[95%]">
      <div className="w-fit">Room: {roomId}</div>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="border-[1px] border-black flex flex-col h-full"
      >
        <div
          ref={chatRoomMessagesRef}
          className="flex flex-col gap-[5px] h-[full] overflow-scroll overscroll-y-contain p-2 grow"
        >
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.userId === user.id ? "justify-end" : "justify-start"
              }`}
            >
              {message.userId !== user.id && (
                <span>{message.user} :&ensp;</span>
              )}
              {message.text}
            </div>
          ))}
        </div>
        <div className="flex p-1">
          <input
            className="grow pl-2 py-1 rounded-lg"
            placeholder="type message here"
            onChange={(e) => setNewMessage(e.target.value)}
            value={newMessage}
          />
          <button type="submit" className="px-3 py-1">
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chatroom;
