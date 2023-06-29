"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Article } from "@/utils/firebase";
import ArticleSnippet from "./ArticleSnippet";

const ArticleList = ({ articles }: { articles: Article[] }) => {
  return (
    <div>
      {articles.map((article: Article) => {
        return (
          <Link
            href={`/article/${article.id}`}
            key={article.id}
            className="border-[1px] border-slate-300 rounded-md w-full px-3 py-1 flex justify-between items-center gap-3 min-h-[140px]"
          >
            <div>
              <h2 className="font-bold text-[18px]">{article.title}</h2>
              <p className="bg-slate-200 py-1 px-2 rounded-2xl w-fit text-[12px]">
                {article.category}
              </p>

              <p>{article.authorName}</p>
              <ArticleSnippet article={article.content} />
              <span>...</span>
              <div className="flex gap-2">
                {article.tags &&
                  article.tags.map((tag: string, index: number) => {
                    return (
                      <p
                        key={index}
                        className="p-1 bg-amber-100 rounded-md w-fit"
                      >
                        # {tag}
                      </p>
                    );
                  })}
              </div>
            </div>
            <div>
              {article.image && (
                <div className="w-fit ml-auto">
                  <Image
                    src={article.image}
                    alt="article cover image"
                    width={400}
                    height={200}
                  />
                </div>
              )}
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ArticleList;
