"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";

interface Prop {
  article: string;
}

const Page = ({ article }: Prop) => {
  const editor = useEditor({
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg m-5 focus:outline-none p-3 border-slate-500 border-[1px] rounded-lg w-full mx-auto",
      },
    },
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: true,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: true,
        },
      }),
    ],
    content: article,
    editable: false,
  });

  return (
    <>
      <EditorContent editor={editor} className="prose w-full pl-[13px]" />
    </>
  );
};

export default Page;
