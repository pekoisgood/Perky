"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import TrendingArticles from "./TrendingArticles";
import ArticleList from "./ArticleList";
import sittingBoy from "../assets/image/people/boy-sitting-on-legs.svg";
import { Article } from "@/utils/firebase";
import ArticleListSkeleton from "@/components/skeleton/ArticleListSkeleton";

export const categories = [
  "Frontend",
  "Backend",
  "IOS",
  "Android",
  "Leetcode",
  "Others",
];

export const categoryClass = `w-fit bg-[#FFD89C] text-bold font-mono py-1 px-3 text-black
shadow-[-3px_3px] shadow-black rounded-2xl border-2 border-black
`;

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    let nextPaging = 0;
    let isFetching = false;

    const fetchArticles = async () => {
      isFetching = true;
      setIsLoading(true);

      const articlesReq = await fetch(`/api/articles?paging=${nextPaging}`);
      const articles = await articlesReq.json();

      setArticles((prev) => {
        return [...prev, ...articles.data];
      });
      isFetching = false;
      setIsLoading(false);

      if (articles.length === 0) {
        nextPaging === null;
        return;
      } else {
        nextPaging += 1;
      }
    };

    async function scrollHandler() {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        console.log("next", nextPaging);

        if (nextPaging === null) return;
        if (isFetching) return;

        fetchArticles();
      }
    }

    fetchArticles();
    if (!window) return;
    window.addEventListener("scroll", scrollHandler);

    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  return (
    <div className="w-full mx-auto">
      <TrendingArticles />

      <div className="relative max-w-[1280px] mx-[10px] lg:mx-auto border-t-2 border-black mt-[20px]">
        <h2 className="w-fit px-2 py-1 bg-black text-white tracking-[1px] font-medium">
          Recent Articles
        </h2>
        <div className="flex mt-[20px] gap-[20px]">
          <div className="hidden sm:flex flex-col w-[150px] items-center gap-5 mt-[56px] sticky top-[120px] left-0 h-[calc(100vh-120px)] self-start">
            <h2 className={`text-center text-[20px] font-semibold`}>
              Category
            </h2>
            {categories.sort().map((category) => {
              return (
                <Link
                  href={`/articles?category=${category}`}
                  key={category}
                  className={
                    categoryClass + " hover:cursor-pointer hover:animate-wiggle"
                  }
                >
                  {category}
                </Link>
              );
            })}
            <Image
              src={sittingBoy}
              alt="boy sitting on legs"
              width={200}
              height={300}
              className={`absolute bottom-0 left-0 scale-150`}
            />
          </div>
          <div className="lg:min-w-[100%-300px] md:min-w-[100%-210px] w-full overflow-hidden">
            {articles && articles.length > 0 && (
              <ArticleList
                articles={articles}
                customLayout="md:justify-start pl-[0]"
              />
            )}
            {isLoading && (
              <div
                className={`h-full flex flex-wrap gap-8 justify-center min-h-[150px] mt-[10px]`}
              >
                <ArticleListSkeleton />
                <ArticleListSkeleton />
                <ArticleListSkeleton />
                <ArticleListSkeleton />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
