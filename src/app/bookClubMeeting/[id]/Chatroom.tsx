"use client";
import { useState, useEffect, useRef, useContext } from "react";
import React from "react";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/utils/firebase";
import { AuthContext } from "@/context/AuthContext";
import { useParams } from "next/navigation";
import { HiPaperAirplane } from "react-icons/hi";
import Image from "next/image";

type Message = {
  user: string;
  text: string;
  room: string;
  createdAt: Timestamp;
  id: string;
  userId: string;
  avatar: string;
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
  const chatRoomMessagesRef = useRef<HTMLDivElement | null>(null);

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
      Avatar: user.avatar,
      room: roomId,
    });

    setNewMessage("");
  };

  useEffect(() => {
    const queryMessages = query(messagesRef, orderBy("createdAt"));
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
          avatar: doc.data().avatar,
        });
      });

      if (!chatRoomMessagesRef.current) return;
      chatRoomMessagesRef.current.scrollTop =
        chatRoomMessagesRef.current.scrollHeight;

      setMessages(messages);
    });

    return () => unsuscribe();
  }, []);

  // return (
  //   <div className="h-full min-h-[500px] border-dashed border-2 border-black rounded-xl p-2">
  //     <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col h-full">
  //       <div
  //         ref={chatRoomMessagesRef}
  //         className="flex flex-col gap-[18px] h-full w-full p-2 grow"
  //       >
  //         {messages.map((message, index) => {
  //           return message.userId === user.id ? (
  //             <div
  //               className="flex flex-col w-fit ml-auto items-end"
  //               key={index}
  //             >
  //               <p className="text-[10px] pr-[6px]">{message.user}</p>
  //               <p
  //                 className="bg-[#9575DE] border-black border-[1px] rounded-full px-[16px] tracking-[1px] text-[14px]
  //             shadow-black shadow-[3px_3px] py-1 w-fit text-white"
  //               >
  //                 {message.text}...
  //               </p>
  //             </div>
  //           ) : (
  //             <div
  //               className="flex gap-1 w-fit mr-auto justify-start items-center"
  //               key={index}
  //             >
  //               <Image
  //                 src={message.avatar}
  //                 alt="user avatar"
  //                 width={25}
  //                 height={25}
  //                 className="rounded-full overflow-hidden h-fit w-fit object-cover"
  //               />
  //               <div>
  //                 <p className="text-[12px]">{message.user}</p>
  //                 <p
  //                   className="bg-[#9575DE] border-black border-[1px] rounded-full px-[16px] tracking-[1px] text-[14px]
  //         shadow-black shadow-[3px_3px] py-1 w-fit text-white text-center"
  //                 >
  //                   {message.text}
  //                 </p>
  //               </div>
  //             </div>
  //           );
  //         })}
  //       </div>
  //       <div className="flex gap-1 p-1 items-center">
  //         <input
  //           className="grow text-[15px] text-black tracking-[1px] pl-2 rounded-lg border-[1px] border-black py-1 px-2 bg-orange-100 outline-none placeholder:text-black focus:border-transparent"
  //           placeholder="Type message here..."
  //           onChange={(e) => setNewMessage(e.target.value)}
  //           value={newMessage}
  //         />
  //         <button
  //           type="submit"
  //           className="scale-100 hover:scale-105 focus:scale-95"
  //         >
  //           <HiPaperAirplane size={20} />
  //         </button>
  //       </div>
  //     </form>
  //   </div>
  // );

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
                className="flex gap-1 w-fit mr-auto justify-start items-center"
                key={index}
              >
                <Image
                  src={message.avatar}
                  alt="user avatar"
                  width={25}
                  height={25}
                  className="rounded-full overflow-hidden h-fit w-fit object-cover"
                />
                <div>
                  <p className="text-[12px]">{message.user}</p>
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
            <HiPaperAirplane size={20} />
          </button>
        </div>
      </form>
      {/* <div className="flex gap-1 p-1 items-center absolute bottom-[-2px] right-[50%] translate-x-[50%]"> */}
    </div>
  );
};

export default Chatroom;
