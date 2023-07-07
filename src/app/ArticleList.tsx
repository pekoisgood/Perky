"use client";
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Article } from "@/utils/firebase";
import ArticleSnippet from "./ArticleSnippet";

const ArticleList = ({
  articles,
  customLayout,
}: {
  articles: Article[];
  customLayout?: string;
}) => {
  const ref = useRef<HTMLAnchorElement[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(
        (entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("translate-x-[200px]");
            entry.target.classList.remove("opacity-0");
            entry.target.classList.add("translate-x-0");
            entry.target.classList.add("duration-500");
            entry.target.classList.add("opacity-1");
          } else {
            entry.target.classList.remove("translate-x-0");
            entry.target.classList.remove("duration-500");
            entry.target.classList.remove("opacity-1");
            entry.target.classList.add("translate-x-[200px]");
            entry.target.classList.add("opacity-0");
          }
        },
        {
          threshold: 1,
        }
      );
    });
    if (ref.current && window) {
      ref.current.forEach((el) => {
        observer.observe(el);
      });
    }
  }, []);

  return (
    <div
      className={`h-full ${
        customLayout ? customLayout : "w-full"
      } flex flex-col gap-8 justify-center`}
      ref={containerRef}
    >
      {articles.map((article: Article, index: number) => {
        return (
          <Link
            href={`/article/${article.id}`}
            key={article.id}
            ref={(el: HTMLAnchorElement) => (ref.current[index] = el)}
            className="w-full p-4 pt-6 flex justify-between items-center gap-3 border-b-2 border-black min-h-[140px] translate-x-[200px] opacity-0  hover:translate-y-[-10px] hover:duration-150"
          >
            <div className="flex flex-col gap-4 w-full relative">
              {article.image && (
                <div className="w-full h-[300px] mx-auto object-cover object-center overflow-hidden relative rounded-2xl border-2 border-black shadow-[-10px_10px] shadow-[#0000003b]">
                  <Image
                    src={article.image}
                    alt="article cover image"
                    fill
                    className="object-cover"
                    priority={true}
                  />
                </div>
              )}
              <div className="flex flex-col gap-2">
                <h2 className="font-bold text-[20px] tracking-[1px] text-center indent-[1px]">
                  {article.title}
                </h2>
                <p className="text-center text-[14px]">
                  author: {article.authorName}
                </p>
                <p className="bg-[#FFD89C] text-black font-mono  tracking-[1px] px-2 py-1 rounded-3xl w-fit text-[10px] sm:text-[12px] border-2 shadow-[-3px_3px] shadow-black border-black font-bold absolute top-[-16px] right-[5px]">
                  {article.category}
                </p>
                <ArticleSnippet article={article.content} />
                <div className="flex gap-2 items-center justify-center flex-wrap">
                  {article.tags &&
                    article.tags.map((tag: string, index: number) => {
                      return (
                        <p
                          key={index}
                          className="px-1 border-tag border-orange-300 bg-orange-100 rounded-md w-fit text-[12px]"
                        >
                          # {tag}
                        </p>
                      );
                    })}
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ArticleList;
