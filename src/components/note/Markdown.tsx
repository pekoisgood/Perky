import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";
import React from "react";
import { Article } from "@/utils/types/types";

const Markdown = ({ article }: { article: Article }) => {
  return (
    <div>
      <h1 className="text-bold text-[30px] text-center">{article.title}</h1>
      <ReactMarkdown remarkPlugins={[remarkGfm]} className="prose">
        {article.content}
      </ReactMarkdown>
    </div>
  );
};

export default Markdown;
