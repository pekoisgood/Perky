import { useState } from "react";

import { Editor } from "@tiptap/react";
import {
  FaBold,
  FaListUl,
  FaListOl,
  FaStrikethrough,
  FaRedo,
  FaUndo,
  FaItalic,
} from "react-icons/fa";
import { PiCodeBold } from "react-icons/pi";
import { BsQuote } from "react-icons/bs";
import { VscHorizontalRule } from "react-icons/vsc";
import { GrClear } from "react-icons/gr";

type Props = {
  editor: Editor | null;
};

export const MenuBar = ({ editor }: Props) => {
  const [showColorPalette, setShowColorPalette] = useState<boolean>(false);
  if (!editor) {
    return null;
  }

  return (
    <div className="flex min-h-[72px] flex-wrap gap-2">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`flex h-[30px] w-[30px] items-center justify-center rounded-md border-[1px]
        border-slate-200 p-1
        ${editor.isActive("bold") ? "is-active" : ""}`}
      >
        <FaBold />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`flex h-[30px] w-[30px] items-center justify-center rounded-md border-[1px]
        border-slate-200 p-1 ${editor.isActive("italic") ? "is-active" : ""}`}
      >
        <FaItalic />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={`flex h-[30px] w-[30px] items-center justify-center rounded-md border-[1px]
        border-slate-200 p-1 ${editor.isActive("strike") ? "is-active" : ""}`}
      >
        <FaStrikethrough />
      </button>
      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={`flex h-[30px] w-[30px] items-center justify-center rounded-md border-[1px]
        border-slate-200 p-1 ${editor.isActive("paragraph") ? "is-active" : ""}`}
      >
        p
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`flex h-[30px] w-[30px] items-center justify-center rounded-md border-[1px]
        border-slate-200 p-1 ${
          editor.isActive("heading", { level: 1 }) ? "is-active" : ""
        }`}
      >
        h1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`flex h-[30px] w-[30px] items-center justify-center rounded-md border-[1px]
        border-slate-200 p-1 ${
          editor.isActive("heading", { level: 2 }) ? "is-active" : ""
        }`}
      >
        h2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`flex h-[30px] w-[30px] items-center justify-center rounded-md border-[1px]
        border-slate-200 p-1 ${
          editor.isActive("heading", { level: 3 }) ? "is-active" : ""
        }`}
      >
        h3
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={`flex h-[30px] w-[30px] items-center justify-center rounded-md border-[1px]
        border-slate-200 p-1 ${
          editor.isActive("heading", { level: 4 }) ? "is-active" : ""
        }`}
      >
        h4
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`flex h-[30px] w-[30px] items-center justify-center rounded-md border-[1px]
        border-slate-200 p-1 ${editor.isActive("bulletList") ? "is-active" : ""}`}
      >
        <FaListUl />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`flex h-[30px] w-[30px] items-center justify-center rounded-md border-[1px]
        border-slate-200 p-1 ${editor.isActive("orderedList") ? "is-active" : ""}`}
      >
        <FaListOl />
      </button>
      <button
        onClick={() =>
          editor.chain().focus().toggleCodeBlock({ language: "js" }).run()
        }
        className={`flex h-[30px] w-[30px] items-center justify-center rounded-md border-[1px]
        border-slate-200 p-1 ${editor.isActive("codeBlock") ? "is-active" : ""}`}
      >
        <PiCodeBold />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`flex h-[30px] w-[30px] items-center justify-center rounded-md border-[1px]
        border-slate-200 p-1 ${editor.isActive("blockquote") ? "is-active" : ""}`}
      >
        <BsQuote />
      </button>
      <button
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        className={`flex h-[30px] w-[30px] items-center justify-center rounded-md border-[1px]
        border-slate-200 p-1`}
      >
        <VscHorizontalRule />
      </button>
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        className={`flex h-[30px] w-[30px] items-center justify-center rounded-md border-[1px]
        border-slate-200 p-1 hover:cursor-pointer`}
      >
        <FaUndo />
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        className={`flex h-[30px] w-[30px] items-center justify-center rounded-md border-[1px]
        border-slate-200 p-1 hover:cursor-pointer`}
      >
        <FaRedo />
      </button>
      <div
        className="h-[30px] rounded-md border-[1px] border-slate-200 p-1 hover:cursor-pointer"
        onClick={() => setShowColorPalette((prev) => !prev)}
      >
        color
      </div>
      {showColorPalette && (
        <div className="flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={() => editor.chain().focus().setColor("#958DF1").run()}
            className={`flex h-[30px] w-[30px] items-center justify-center rounded-md
            border-[1px] border-slate-200 bg-[#958DF1] text-[#958DF1] ${
              editor.isActive("textStyle", { color: "#958DF1" })
                ? "is-active"
                : ""
            }`}
          ></button>
          <button
            onClick={() => editor.chain().focus().setColor("#F98181").run()}
            className={`flex h-[30px] w-[30px] items-center justify-center rounded-md border-[1px]
            border-slate-200 bg-[#F98181] p-1 ${
              editor.isActive("textStyle", { color: "#F98181" })
                ? "is-active"
                : ""
            }`}
          ></button>
          <button
            onClick={() => editor.chain().focus().setColor("#FBBC88").run()}
            className={`flex h-[30px] w-[30px] items-center justify-center rounded-md border-[1px]
            border-slate-200 bg-[#FBBC88] p-1 ${
              editor.isActive("textStyle", { color: "#FBBC88" })
                ? "is-active"
                : ""
            }`}
          ></button>

          <button
            onClick={() => editor.chain().focus().setColor("#FAF594").run()}
            className={`flex h-[30px] w-[30px] items-center justify-center rounded-md border-[1px]
        border-slate-200 bg-[#FAF594] p-1 ${
          editor.isActive("textStyle", { color: "#FAF594" }) ? "is-active" : ""
        }`}
          ></button>
          <button
            onClick={() => editor.chain().focus().setColor("#70CFF8").run()}
            className={`flex h-[30px] w-[30px] items-center justify-center rounded-md border-[1px]
        border-slate-200 bg-[#70CFF8] p-1 ${
          editor.isActive("textStyle", { color: "#70CFF8" }) ? "is-active" : ""
        }`}
          ></button>
          <button
            onClick={() => editor.chain().focus().setColor("#94FADB").run()}
            className={`flex h-[30px] w-[30px] items-center justify-center rounded-md border-[1px]
        border-slate-200 bg-[#94FADB] p-1 ${
          editor.isActive("textStyle", { color: "#94FADB" }) ? "is-active" : ""
        }`}
          ></button>
          <button
            onClick={() => editor.chain().focus().setColor("#B9F18D").run()}
            className={`flex h-[30px] w-[30px] items-center justify-center rounded-md border-[1px]
        border-slate-200 bg-[#B9F18D] p-1 ${
          editor.isActive("textStyle", { color: "#B9F18D" }) ? "is-active" : ""
        }`}
          ></button>
          <button
            className="flex h-[30px] w-[30px] items-center justify-center rounded-md border-[1px]
          border-slate-200 p-1"
            onClick={() => editor.chain().focus().unsetColor().run()}
          >
            <GrClear />
          </button>
        </div>
      )}
    </div>
  );
};
