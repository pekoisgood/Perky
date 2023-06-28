"use client";

import { EditorContent, useEditor, ReactNodeViewRenderer } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useEffect } from "react";
import { MenuBar } from "./MenuBar";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { handleUpdateArticle } from "@/redux/slice/postArticleSlice";
import TextStyle from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";

import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";
import { lowlight } from "lowlight";
import "./style.css";

import CodeBlockComponent from "./CodeBlockComponent";

lowlight.registerLanguage("html", html);
lowlight.registerLanguage("css", css);
lowlight.registerLanguage("js", js);
lowlight.registerLanguage("ts", ts);

const Page = () => {
  const dispatch = useAppDispatch();
  const articleContent = useAppSelector(
    (state) => state.postArticle.value.content
  );

  const editor = useEditor({
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl focus:outline-none p-3 border-slate-500 border-[1px] rounded-lg w-full",
      },
    },
    extensions: [
      TextStyle,
      Color,
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
      CodeBlockLowlight.extend({
        addNodeView() {
          return ReactNodeViewRenderer(CodeBlockComponent);
        },
      }).configure({ lowlight }),
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
    <div className="border-2 border-slate-500 mx-auto flex flex-col min-h-[200px] w-full">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} className="prose mx-auto w-full mt-5" />
    </div>
  );
};

export default Page;
