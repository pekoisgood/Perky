import React from "react";
import Link from "next/link";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { Article } from "@/utils/firebase";

const Page = async ({ params }: { params: { category: string } }) => {
  const category = params.category;
  const categoryArticlesReq = await fetch(
    process.env.URL + "/api/articles/" + category
  );
  const articles = await categoryArticlesReq.json();

  return (
    <div className="flex w-screen border-2 border-sky-900">
      <div className="h-full grow p-3 pt-5 flex flex-col items-center gap-3">
        {articles.map((article: Article) => {
          return (
            <Link
              href={`/article/${article.id}`}
              key={article.id}
              className="border-[1px] border-slate-300 rounded-md w-full px-3 py-1"
            >
              <h2 className="font-bold text-[18px]">{article.title}</h2>
              <p className="bg-slate-200 py-1 px-2 rounded-2xl w-fit text-[12px]">
                {article.category}
              </p>

              <p>{article.authorName}</p>
              <ReactMarkdown>{article.content.slice(0, 10)}</ReactMarkdown>
              <div>
                {article.tags.length > 0 &&
                  article.tags.map((tag: string, index: number) => {
                    return (
                      <p
                        key={index}
                        className="p-1 bg-amber-100 rounded-md w-fit"
                      >
                        {tag}
                      </p>
                    );
                  })}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Page;
