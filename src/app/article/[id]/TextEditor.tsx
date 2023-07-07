"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";
import { lowlight } from "lowlight";
import "@/app/article/postArticle/textEditor/style.css";

lowlight.registerLanguage("html", html);
lowlight.registerLanguage("css", css);
lowlight.registerLanguage("js", js);
lowlight.registerLanguage("ts", ts);

const Page = ({ article }: { article: string }) => {
  const editor = useEditor({
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert prose-md focus:outline-none p-3 rounded-lg mx-auto",
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
      CodeBlockLowlight.configure({ lowlight }),
    ],
    content: article,
    editable: false,
  });

  return (
    <div className="mx-auto flex flex-col min-h-[200px] w-full">
      <EditorContent editor={editor} className="prose w-fit mx-auto" />
    </div>
  );
};

export default Page;
