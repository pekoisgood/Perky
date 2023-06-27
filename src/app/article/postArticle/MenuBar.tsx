import { Editor } from "@tiptap/react";

type Props = {
  editor: Editor | null;
};

export const MenuBar = ({ editor }: Props) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex gap-2 flex-wrap">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`border-[1px] border-slate-200 p-1 rounded-md ${
          editor.isActive("bold") ? "is-active" : ""
        }`}
      >
        bold
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`border-[1px] border-slate-200 p-1 rounded-md ${
          editor.isActive("italic") ? "is-active" : ""
        }`}
      >
        italic
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={`border-[1px] border-slate-200 p-1 rounded-md ${
          editor.isActive("strike") ? "is-active" : ""
        }`}
      >
        strike
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={`border-[1px] border-slate-200 p-1 rounded-md ${
          editor.isActive("code") ? "is-active" : ""
        }`}
      >
        code
      </button>
      <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
        clear marks
      </button>
      <button onClick={() => editor.chain().focus().clearNodes().run()}>
        clear nodes
      </button>
      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={`border-[1px] border-slate-200 p-1 rounded-md ${
          editor.isActive("paragraph") ? "is-active" : ""
        }`}
      >
        paragraph
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`border-[1px] border-slate-200 p-1 rounded-md ${
          editor.isActive("heading", { level: 1 }) ? "is-active" : ""
        }`}
      >
        h1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`border-[1px] border-slate-200 p-1 rounded-md ${
          editor.isActive("heading", { level: 2 }) ? "is-active" : ""
        }`}
      >
        h2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`border-[1px] border-slate-200 p-1 rounded-md ${
          editor.isActive("heading", { level: 3 }) ? "is-active" : ""
        }`}
      >
        h3
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={`border-[1px] border-slate-200 p-1 rounded-md ${
          editor.isActive("heading", { level: 4 }) ? "is-active" : ""
        }`}
      >
        h4
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={`border-[1px] border-slate-200 p-1 rounded-md ${
          editor.isActive("heading", { level: 5 }) ? "is-active" : ""
        }`}
      >
        h5
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={`border-[1px] border-slate-200 p-1 rounded-md ${
          editor.isActive("heading", { level: 6 }) ? "is-active" : ""
        }`}
      >
        h6
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`border-[1px] border-slate-200 p-1 rounded-md ${
          editor.isActive("bulletList") ? "is-active" : ""
        }`}
      >
        bullet list
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`border-[1px] border-slate-200 p-1 rounded-md ${
          editor.isActive("orderedList") ? "is-active" : ""
        }`}
      >
        ordered list
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={`border-[1px] border-slate-200 p-1 rounded-md ${
          editor.isActive("codeBlock") ? "is-active" : ""
        }`}
      >
        code block
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`border-[1px] border-slate-200 p-1 rounded-md ${
          editor.isActive("blockquote") ? "is-active" : ""
        }`}
      >
        blockquote
      </button>
      <button
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        className={`border-[1px] border-slate-200 p-1 rounded-md`}
      >
        horizontal rule
      </button>
      <button
        onClick={() => editor.chain().focus().setHardBreak().run()}
        className={`border-[1px] border-slate-200 p-1 rounded-md`}
      >
        hard break
      </button>
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        className={`border-[1px] border-slate-200 p-1 rounded-md`}
      >
        undo
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        className={`border-[1px] border-slate-200 p-1 rounded-md`}
      >
        redo
      </button>
      {/* <button
        onClick={() => editor.chain().focus().setColor("#958DF1").run()}
        className={
          editor.isActive("textStyle", { color: "#958DF1" }) ? "is-active" : ""
        }
      >
        purple
      </button> */}
    </div>
  );
};
