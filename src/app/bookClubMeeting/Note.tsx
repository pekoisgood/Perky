"use client";
// import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import React from "react";
// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import {
//   materialDark,
//   materialLight,
//   oneLight,
// } from "react-syntax-highlighter/dist/cjs/styles/prism";

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
  return (
    <div className="h-[95%] relative border-orange-400 border-2">
      <div
        className={` absolute top-2 right-2 hover:cursor-pointer p-2 rounded-b-lg  ${
          isPreview ? "bg-orange-200 font-medium" : " bg-orange-100 "
        }`}
        onClick={() => setIsPreview((prev) => !prev)}
      >
        preview
      </div>
      <textarea
        value={text}
        className={`w-full border-sky-500 border-[1px] ${
          isPreview ? "h-1/2" : "h-full"
        }`}
        onChange={(e) => setText(e.target.value)}
      />
      {isPreview && (
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          className={`w-full border-sky-500 border-[1px] prose
            ${isPreview && "h-1/2"}`}
        >
          {/* <SyntaxHighlighter> */}
          {text}
          {/* </SyntaxHighlighter> */}
        </ReactMarkdown>
      )}
    </div>
  );
};

export default Note;
