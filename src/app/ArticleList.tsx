"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Article } from "@/utils/firebase";
import ArticleSnippet from "./ArticleSnippet";
import loading from "../assets/image/backgroundIcon/loading-carga.gif";

const ArticleList = ({
  articles,
  customLayout,
}: {
  articles: Article[];
  customLayout?: string;
}) => {
  const ref = useRef<HTMLAnchorElement[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isFirstLoading, setIsFirstLoading] = useState<boolean>(true);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(
        (entry) => {
          if (entry.isIntersecting) {
            if (isFirstLoading) {
              setIsFirstLoading(false);
              return;
            }
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
  }, [isFirstLoading]);

  return (
    <div
      className={`h-full ${
        customLayout ? customLayout : "w-full"
      } flex flex-wrap gap-8 min-h-[150px] mt-[10px]`}
      ref={containerRef}
    >
      {articles.map((article: Article, index: number) => {
        if (!article.image) return;
        return (
          <Link
            href={`/article/${article.id}`}
            key={index}
            ref={(el: HTMLAnchorElement) => (ref.current[index] = el)}
            className={`w-[100%] lg:w-[47%] p-4 pt-6 flex justify-between items-start gap-3 border-b-[1px] border-[#d1d5db] min-h-[140px] ${
              isFirstLoading && "translate-x-0"
            } hover:translate-y-[-10px] hover:duration-150`}
          >
            <div className="flex flex-col gap-4 w-full h-full relative">
              {article.image && (
                <div className="w-full h-[300px] mx-auto object-cover object-center overflow-hidden relative rounded-2xl border-2 border-black shadow-[-10px_10px] shadow-[#0000003b]">
                  <Image
                    src={article.image || loading}
                    alt="article cover image"
                    width={500}
                    height={300}
                    className={`${
                      article.image
                        ? "object-cover w-full h-full"
                        : "flex justify-center items-center"
                    }`}
                    priority={true}
                  />
                </div>
              )}
              <div className="flex flex-col gap-2 h-[calc(100%-300px)]">
                <h2 className="font-bold text-[24px] tracking-[1px] text-center indent-[1px] break-words hyphens-auto">
                  {article.title}
                </h2>
                <p className="text-center text-[14px] font-medium line-clamp-1">
                  author: {article.authorName}
                </p>
                <p className="bg-[#FFD89C] text-black font-mono tracking-[1px] px-2 py-1 rounded-3xl w-fit text-[10px] sm:text-[12px] border-2 shadow-[-2px_2px] shadow-black border-black font-bold absolute top-[-16px] right-[5px]">
                  {article.category}
                </p>
                <ArticleSnippet article={article.content} />
                <div className="flex gap-2 items-center flex-wrap mt-auto">
                  {article.tags &&
                    article.tags.map((tag: string, index: number) => {
                      return (
                        <p
                          key={index}
                          className="px-2 py-1 bg-[#245953] text-white rounded-md w-fit text-[12px] break-words hyphens-auto"
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
