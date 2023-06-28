"use client";
import { useState } from "react";

import Chatroom from "./Chatroom";
import Note from "./Note";
import CodeEditor from "./CodeEditor";

const sidebarFunc = ["CHATROOM", "NOTE", "CODE EDITOR"];

const Side = () => {
  const [isChatRoom, setIsChatroom] = useState<string>(sidebarFunc[0]);
  const [text, setText] = useState<string>("");
  const [newMessage, setNewMessage] = useState<string>("");
  const [isPreview, setIsPreview] = useState<boolean>(false);

  const getSideBarFunction = () => {
    if (isChatRoom === sidebarFunc[0]) {
      return <Chatroom newMessage={newMessage} setNewMessage={setNewMessage} />;
    } else if (isChatRoom === sidebarFunc[1]) {
      return (
        <Note
          text={text}
          setText={setText}
          isPreview={isPreview}
          setIsPreview={setIsPreview}
        />
      );
    } else {
      return (
        <div className="full">
          <CodeEditor />
        </div>
      );
    }
  };

  return (
    <>
      <div className="flex flex-col px-2 w-full h-full">
        <div className="flex gap-3 mb-3">
          <div
            className={"rounded-lg bg-orange-100 px-2 hover:cursor-pointer"}
            onClick={() => setIsChatroom(sidebarFunc[0])}
          >
            聊天室
          </div>
          <div
            className={`px-2 hover:cursor-pointer rounded-lg ${
              isChatRoom ? " bg-orange-100" : "bg-orange-200"
            }`}
            onClick={() => setIsChatroom(sidebarFunc[1])}
          >
            筆記
          </div>
          <div
            className={`px-2 hover:cursor-pointer rounded-lg ${
              isChatRoom ? " bg-orange-100" : "bg-orange-200"
            }`}
            onClick={() => setIsChatroom(sidebarFunc[2])}
          >
            code
          </div>
        </div>
        <div className="h-[95%]">{getSideBarFunction()}</div>
      </div>
    </>
  );
};

export default Side;
