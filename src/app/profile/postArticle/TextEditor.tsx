"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useEffect } from "react";
import { MenuBar } from "./MenuBar";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { handleUpdateArticle } from "@/redux/slice/postArticleSlice";

const Page = () => {
  const dispatch = useAppDispatch();
  const articleContent = useAppSelector(
    (state) => state.postArticle.value.content
  );

  const editor = useEditor({
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none p-3 border-slate-500 border-[1px] rounded-lg mx-auto w-[1000px]",
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
    content: articleContent,
  });

  useEffect(() => {
    if (!editor) return;
    dispatch(
      handleUpdateArticle({
        action: "UPDATE_INPUTS",
        key: "content",
        value: editor.getHTML(),
      })
    );
  }, [editor?.getHTML()]);

  return (
    <div className="border-2 border-slate-500 mx-auto w-[1000px] flex flex-col min-h-[200px]">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} className="prose w-full pl-[13px]" />
    </div>
  );
};

export default Page;
