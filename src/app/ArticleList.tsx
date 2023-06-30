"use client";
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Article } from "@/utils/firebase";
import ArticleSnippet from "./ArticleSnippet";

const ArticleList = ({ articles }: { articles: Article[] }) => {
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
          root: containerRef.current,
          threshold: 1,
          rootMargin: "-500px 0px",
        }
      );
    });
    ref.current.forEach((el) => {
      observer.observe(el);
    });

    window.addEventListener("scroll", () => {
      ref.current.forEach((el) => {
        observer.observe(el);
      });
    });
  }, [ref.current]);

  return (
    <div className="h-full grow p-3 flex flex-col gap-8" ref={containerRef}>
      {articles.map((article: Article, index: number) => {
        return (
          <Link
            href={`/article/${article.id}`}
            key={article.id}
            ref={(el: HTMLAnchorElement) => (ref.current[index] = el)}
            className="relative border-custom rounded-custom border-black w-full p-4 flex justify-between items-center gap-3 min-h-[140px] translate-x-[200px] opacity-0 hover:translate-y-[-10px] hover:duration-150 "
          >
            <div className="flex flex-col gap-4 w-full">
              {article.image && (
                <div className="w-full h-[300px] mx-auto object-cover object-center overflow-hidden relative rounded-2xl shadow-md border-2 border-black">
                  <Image
                    src={article.image}
                    alt="article cover image"
                    fill
                    className="object-cover"
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
                <p className="bg-[#CEAB93] tracking-[1px] px-2 py-1 rounded-3xl w-fit text-[12px] font-bold absolute top-[-15px] right-[5px]">
                  {article.category}
                </p>
                <ArticleSnippet article={article.content} />
                <div className="flex gap-2">
                  {article.tags &&
                    article.tags.map((tag: string, index: number) => {
                      return (
                        <p
                          key={index}
                          className="px-1 border-tag w-fit text-[12px]"
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
