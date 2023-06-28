"use client";
import React from "react";
import Video from "./Video";
import { useState } from "react";

import Chatroom from "./Chatroom";
import Note from "./Note";

const Page = () => {
  const [isChatRoom, setIsChatroom] = useState(true);
  const [text, setText] = useState<string>("");
  const [newMessage, setNewMessage] = useState<string>("");
  const [isPreview, setIsPreview] = useState<boolean>(false);

  return (
    <div className="flex flex-col border-rose-500 border-[1px] h-screen p-[10px] pt-[50px]">
      <h1 className="w-fit mx-auto text-[20px] mb-[20px]">讀書會</h1>
      <div className="flex w-full grow bg-slate-200">
        <div className="w-[70%]">
          <Video />
        </div>
        <div className="flex flex-col px-2 w-[30%]">
          <div className="flex gap-3 mb-3">
            <div
              className={
                isChatRoom
                  ? "rounded-lg bg-orange-200 px-2 hover:cursor-pointer"
                  : "rounded-lg bg-orange-100 px-2 hover:cursor-pointer"
              }
              onClick={() => setIsChatroom(true)}
            >
              聊天室
            </div>
            <div
              className={`px-2 hover:cursor-pointer rounded-lg ${
                isChatRoom ? " bg-orange-100" : "bg-orange-200"
              }`}
              onClick={() => setIsChatroom(false)}
            >
              筆記
            </div>
          </div>
          <div className="h-[94%]">
            {isChatRoom ? (
              <Chatroom newMessage={newMessage} setNewMessage={setNewMessage} />
            ) : (
              <Note
                text={text}
                setText={setText}
                isPreview={isPreview}
                setIsPreview={setIsPreview}
              />
            )}{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
