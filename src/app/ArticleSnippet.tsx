"use client";

import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const ArticleSnippet = ({ article }: { article: string }) => {
  const editor = useEditor({
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none p-3 border-slate-500 border-[1px] rounded-lg mx-auto w-[1000px] break-words hyphens-auto",
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
    <div className="line-clamp-2 text-[13px] break-words hyphens-auto">
      {editor?.getText()}
    </div>
  );
};

export default ArticleSnippet;
