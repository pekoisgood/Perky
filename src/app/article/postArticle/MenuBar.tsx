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
import { useState } from "react";

type Props = {
  editor: Editor | null;
};

export const MenuBar = ({ editor }: Props) => {
  const [showColorPalette, setShowColorPalette] = useState<boolean>(false);
  if (!editor) {
    return null;
  }

  return (
    <div className="flex justify-center gap-2 flex-wrap mx-auto">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`border-[1px] border-slate-200 p-1 rounded-md flex items-center justify-center
        w-[30px] h-[30px]
        ${editor.isActive("bold") ? "is-active" : ""}`}
      >
        <FaBold />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`border-[1px] border-slate-200 p-1 rounded-md flex items-center justify-center
        w-[30px] h-[30px] ${editor.isActive("italic") ? "is-active" : ""}`}
      >
        <FaItalic />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={`border-[1px] border-slate-200 p-1 rounded-md flex items-center justify-center
        w-[30px] h-[30px] ${editor.isActive("strike") ? "is-active" : ""}`}
      >
        <FaStrikethrough />
      </button>
      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={`border-[1px] border-slate-200 p-1 rounded-md flex items-center justify-center
        w-[30px] h-[30px] ${editor.isActive("paragraph") ? "is-active" : ""}`}
      >
        p
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`border-[1px] border-slate-200 p-1 rounded-md flex items-center justify-center
        w-[30px] h-[30px] ${
          editor.isActive("heading", { level: 1 }) ? "is-active" : ""
        }`}
      >
        h1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`border-[1px] border-slate-200 p-1 rounded-md flex items-center justify-center
        w-[30px] h-[30px] ${
          editor.isActive("heading", { level: 2 }) ? "is-active" : ""
        }`}
      >
        h2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`border-[1px] border-slate-200 p-1 rounded-md flex items-center justify-center
        w-[30px] h-[30px] ${
          editor.isActive("heading", { level: 3 }) ? "is-active" : ""
        }`}
      >
        h3
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={`border-[1px] border-slate-200 p-1 rounded-md flex items-center justify-center
        w-[30px] h-[30px] ${
          editor.isActive("heading", { level: 4 }) ? "is-active" : ""
        }`}
      >
        h4
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`border-[1px] border-slate-200 p-1 rounded-md flex items-center justify-center
        w-[30px] h-[30px] ${editor.isActive("bulletList") ? "is-active" : ""}`}
      >
        <FaListUl />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`border-[1px] border-slate-200 p-1 rounded-md flex items-center justify-center
        w-[30px] h-[30px] ${editor.isActive("orderedList") ? "is-active" : ""}`}
      >
        <FaListOl />
      </button>
      <button
        onClick={() =>
          editor.chain().focus().toggleCodeBlock({ language: "js" }).run()
        }
        className={`border-[1px] border-slate-200 p-1 rounded-md flex items-center justify-center
        w-[30px] h-[30px] ${editor.isActive("codeBlock") ? "is-active" : ""}`}
      >
        <PiCodeBold />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`border-[1px] border-slate-200 p-1 rounded-md flex items-center justify-center
        w-[30px] h-[30px] ${editor.isActive("blockquote") ? "is-active" : ""}`}
      >
        <BsQuote />
      </button>
      <button
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        className={`border-[1px] border-slate-200 p-1 rounded-md flex items-center justify-center
        w-[30px] h-[30px]`}
      >
        <VscHorizontalRule />
      </button>
      {/* <button
        onClick={() => editor.chain().focus().setHardBreak().run()}
        className={`border-[1px] border-slate-200 p-1 rounded-md`}
      >
        hard break
      </button> */}
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        className={`border-[1px] border-slate-200 p-1 rounded-md flex items-center justify-center
        w-[30px] h-[30px] hover:cursor-pointer`}
      >
        <FaUndo />
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        className={`border-[1px] border-slate-200 p-1 rounded-md flex items-center justify-center
        w-[30px] h-[30px] hover:cursor-pointer`}
      >
        <FaRedo />
      </button>
      <div
        className="border-[1px] border-slate-200 p-1 rounded-md hover:cursor-pointer"
        onClick={() => setShowColorPalette((prev) => !prev)}
      >
        color
      </div>
      {showColorPalette && (
        <div className="flex flex-wrap justify-center items-center gap-2">
          <button
            onClick={() => editor.chain().focus().setColor("#958DF1").run()}
            className={`w-[15px] h-[15px] bg-[#958DF1] text-[#958DF1] ${
              editor.isActive("textStyle", { color: "#958DF1" })
                ? "is-active"
                : ""
            }`}
          ></button>
          <button
            onClick={() => editor.chain().focus().setColor("#F98181").run()}
            className={`w-[15px] h-[15px] bg-[#F98181] ${
              editor.isActive("textStyle", { color: "#F98181" })
                ? "is-active"
                : ""
            }`}
          ></button>
          <button
            onClick={() => editor.chain().focus().setColor("#FBBC88").run()}
            className={`w-[15px] h-[15px] bg-[#FBBC88] ${
              editor.isActive("textStyle", { color: "#FBBC88" })
                ? "is-active"
                : ""
            }`}
          ></button>

          <button
            onClick={() => editor.chain().focus().setColor("#FAF594").run()}
            className={`w-[15px] h-[15px] bg-[#FAF594] ${
              editor.isActive("textStyle", { color: "#FAF594" })
                ? "is-active"
                : ""
            }`}
          ></button>
          <button
            onClick={() => editor.chain().focus().setColor("#70CFF8").run()}
            className={`w-[15px] h-[15px] bg-[#70CFF8] ${
              editor.isActive("textStyle", { color: "#70CFF8" })
                ? "is-active"
                : ""
            }`}
          ></button>
          <button
            onClick={() => editor.chain().focus().setColor("#94FADB").run()}
            className={`w-[15px] h-[15px] bg-[#94FADB] ${
              editor.isActive("textStyle", { color: "#94FADB" })
                ? "is-active"
                : ""
            }`}
          ></button>
          <button
            onClick={() => editor.chain().focus().setColor("#B9F18D").run()}
            className={`w-[15px] h-[15px] bg-[#B9F18D] ${
              editor.isActive("textStyle", { color: "#B9F18D" })
                ? "is-active"
                : ""
            }`}
          ></button>
          <button onClick={() => editor.chain().focus().unsetColor().run()}>
            <GrClear />
          </button>
        </div>
      )}
    </div>
  );
};
