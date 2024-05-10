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

  const param = useParams<{ id: string }>();
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
        doc(db, "users", user.id, "bookClubNotes", bookClubId),
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
    <div className="relative flex h-full flex-col gap-2">
      <div
        className={`absolute right-2 top-2 rounded-lg border-2 border-black bg-[#9575DE] px-[5px]
        py-[2px] indent-[1px] text-[12px] tracking-[1px] text-white shadow-[-3px_3px] shadow-black
         hover:cursor-pointer ${
           isPreview
             ? "translate-x-[-2px] translate-y-[2px] font-medium shadow-none"
             : " "
         }`}
        onClick={() => setIsPreview((prev) => !prev)}
      >
        preview
      </div>
      <textarea
        value={text}
        className={`w-full resize-none rounded-xl border-[1px] border-black bg-orange-50 p-3 tracking-[1px] outline-none
        focus:border-orange-300 ${isPreview ? "h-1/2" : "h-full"}`}
        placeholder="Takes note here !"
        onChange={(e) => setText(e.target.value)}
      />
      {isPreview && (
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          className={`prose w-full overflow-scroll rounded-xl border-[1px] border-black bg-orange-50 p-2 text-black
            ${isPreview && "h-1/2"}`}
        >
          {text}
        </ReactMarkdown>
      )}
      <div className="ml-auto mt-[5px] flex w-fit items-center gap-2">
        {processing && <p className="text-[12px] text-[#EB455F]">saved ! </p>}
        <button
          className="rounded-md bg-[#EB455F] p-2 text-[13px] text-white drop-shadow-lg active:translate-y-[2px]"
          onClick={saveNote}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Note;
