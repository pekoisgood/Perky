"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import React, { useContext } from "react";
// import { AuthContext } from "@/context/AuthContext";
import { setDoc, doc } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { AuthContext } from "@/context/AuthContext";

const Note = ({
  text,
  setText,
  isPreview,
  setIsPreview,
}: {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  isPreview: boolean;
  setIsPreview: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { user } = useContext(AuthContext);

  const saveNote = async () => {
    if (!text) return;
    await setDoc(
      doc(db, "users", user.id, "bookClubNotes", "hKi5OR9qWFgMJeSM1xJ8"),
      {
        bookClubId: "hKi5OR9qWFgMJeSM1xJ8",
        note: text,
      }
    );
  };

  return (
    <div className="h-full relative border-2 flex flex-col">
      <div
        className={` absolute top-2 right-2 hover:cursor-pointer p-2 rounded-b-lg  ${
          isPreview ? "bg-orange-200 font-medium" : " bg-orange-100 "
        }`}
        onClick={() => setIsPreview((prev) => !prev)}
      >
        preview
      </div>
      <textarea
        value={text}
        className={`w-full border-sky-500 border-[1px] ${
          isPreview ? "h-1/2" : "h-full"
        }`}
        onChange={(e) => setText(e.target.value)}
      />
      {isPreview && (
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          className={`w-full border-sky-500 border-[1px] prose overflow-scroll
            ${isPreview && "h-1/2"}`}
        >
          {/* <SyntaxHighlighter> */}
          {text}
          {/* </SyntaxHighlighter> */}
        </ReactMarkdown>
      )}
      <button
        className="p-2 bg-rose-500 text-white rounded-md w-fit ml-auto active:translate-y-[2px] drop-shadow-lg"
        onClick={saveNote}
      >
        Save
      </button>
    </div>
  );
};

export default Note;
