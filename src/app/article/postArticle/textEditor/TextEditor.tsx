"use client";

import React, { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { handleUpdateArticle } from "@/redux/slice/postArticleSlice";
import TextStyle from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import { EditorContent, useEditor, ReactNodeViewRenderer } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";
import { lowlight } from "lowlight";
import "./style.css";

import CodeBlockComponent from "./CodeBlockComponent";
import { MenuBar } from "./MenuBar";

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
          "focus:outline-none min-h-[calc(100vh-660px)] p-3 w-full border-dashed border-2 border-[#245953] rounded-2xl overflow-y-scroll max-h-[calc(100vh-500px)] focus:border-solid",
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
  }, [editor, editor?.getHTML()]);

  return (
    <>
      <MenuBar editor={editor} />
      <EditorContent
        editor={editor}
        className="prose mx-auto w-full mt-5"
        placeholder="Let's create some awsome content...!"
      />
    </>
  );
};

export default Page;
