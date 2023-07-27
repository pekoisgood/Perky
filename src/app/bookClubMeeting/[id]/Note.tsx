"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { setDoc, doc, getDoc } from "firebase/firestore";

import { db } from "@/utils/firebase/firebase";
import { useAppSelector } from "@/redux/hooks";

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
  const [processing, setProcessing] = useState(false);

  const user = useAppSelector((state) => state.auth.value);

  const param = useParams();
  const bookClubId = param.id;

  const saveNote = async () => {
    if (!text) return;
    await setDoc(doc(db, "users", user.id, "bookClubNotes", bookClubId), {
      bookClubId: "bookClubId",
      note: text,
    });
    setProcessing(true);
  };

  useEffect(() => {
    async function getNote() {
      const result = await getDoc(
        doc(db, "users", user.id, "bookClubNotes", bookClubId)
      );
      const note = await result!.data();

      if (!note) {
        setText("");
        return;
      }

      setText(note.note);
    }
    getNote();
  }, []);

  return (
    <div className="h-full relative flex flex-col gap-2">
      <div
        className={`absolute top-2 right-2 px-[5px] py-[2px] text-[12px] tracking-[1px] indent-[1px]
        border-2 border-black rounded-lg shadow-black shadow-[-3px_3px] bg-[#9575DE] text-white
         hover:cursor-pointer ${
           isPreview
             ? "font-medium translate-y-[2px] translate-x-[-2px] shadow-none"
             : " "
         }`}
        onClick={() => setIsPreview((prev) => !prev)}
      >
        preview
      </div>
      <textarea
        value={text}
        className={`w-full border-[1px] border-black rounded-xl p-3 resize-none outline-none tracking-[1px] bg-orange-50
        focus:border-orange-300 ${isPreview ? "h-1/2" : "h-full"}`}
        placeholder="Takes note here !"
        onChange={(e) => setText(e.target.value)}
      />
      {isPreview && (
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          className={`w-full prose overflow-scroll p-2 text-black border-[1px] border-black rounded-xl bg-orange-50
            ${isPreview && "h-1/2"}`}
        >
          {text}
        </ReactMarkdown>
      )}
      <div className="flex items-center gap-2 w-fit ml-auto mt-[5px]">
        {processing && <p className="text-[12px] text-[#EB455F]">saved ! </p>}
        <button
          className="p-2 bg-[#EB455F] text-white text-[13px] rounded-md active:translate-y-[2px] drop-shadow-lg"
          onClick={saveNote}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Note;
