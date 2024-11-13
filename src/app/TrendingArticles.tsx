"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { collection, getDocs, orderBy, query, limit } from "firebase/firestore";
import { motion } from "framer-motion";

import { db } from "@/utils/firebase/firebase";
import TrendingArticleSkeleton from "@/components/Skeleton/TrendingArticleSkeleton";
import ArticleSnippet from "@/components/Article/ArticleSnippet";
import monster from "@/assets/image/people/monster.svg";
import beanieMan from "@/assets/image/people/guy-with-beanie.svg";
import { TrendingArticle } from "@/utils/types/types";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5,
    },
  },
};

const categoryClass = `w-fit h-fit sm:h-auto bg-[#FFD89C] font-semibold font-mono py-1 px-2 text-black
          rounded-2xl border-2 border-black text-[12px] shadow-black shadow-[-3px_3px]`;

const TrendingArticles = () => {
  const [articles, setArticles] = useState<TrendingArticle[]>([]);

  useEffect(() => {
    const getArticle = async () => {
      const data: TrendingArticle[] = [];
      const q = query(
        collection(db, "articles"),
        orderBy("savedCount", "desc"),
        limit(5),
      );
      const result = await getDocs(q);
      result.forEach((doc) => {
        data.push({
          id: doc.id,
          title: doc.data().title,
          authorName: doc.data().authorName,
          savedCount: doc.data().savedCount,
          category: doc.data().category,
          image: doc.data().image,
          content: doc.data().content,
        });
      });
      setArticles(data);
    };
    getArticle();
  }, []);

  return (
    <div className="relative z-0 mx-auto flex w-full max-w-[1280px] flex-col border-t-2 border-black  pb-[15px] sm:h-[calc(100vh-120px)] sm:pb-0">
      <h2 className="z-10 h-fit w-fit bg-black px-2 py-1 font-medium tracking-[1px] text-white ">
        Trending Articles
      </h2>
      <div>
        <Image
          src={monster}
          alt="monster"
          width={200}
          height={300}
          className="absolute right-0 top-0 rotate-180 opacity-40"
        />
      </div>

      <Image
        src={beanieMan}
        alt="boy sitting on legs"
        width={180}
        height={300}
        className={`absolute left-0 top-[calc(100vh-380px)] z-0 opacity-40`}
      />
      {articles.length > 0 ? (
        <motion.div
          initial="hidden"
          animate="show"
          variants={container}
          className="z-10 mx-auto flex h-[92%] max-w-[1280px] flex-wrap gap-[15px] px-[20px] md:justify-between  sm:[&>*:nth-child(2)]:border-none"
        >
          {articles.map((article, index) => {
            if (index === 0) {
              return (
                <Link
                  href={`article/${article.id}`}
                  key={index}
                  className="mt-auto flex h-[70%] w-full flex-col gap-[10px] border-b-[1px] border-[#d1d5db] pb-[30px] pt-[10px] hover:translate-y-[-3px] hover:duration-100 sm:flex-row sm:gap-[20px] sm:pt-0"
                >
                  <Image
                    src={article.image}
                    alt="cover image"
                    width={800}
                    height={400}
                    className="w-full basis-1/2 rounded-xl border-2 border-black object-cover shadow-[-10px_10px] shadow-[#0000003b] sm:min-w-[60%]"
                    priority={true}
                  />
                  <div className="flex flex-col gap-[10px]">
                    <p className={`mt-[10px] sm:mt-0 ${categoryClass}`}>
                      {article.category}
                    </p>
                    <h3 className="line-clamp-5 text-[30px] font-bold sm:text-[40px]">
                      {article.title}
                    </h3>
                    <p className="text-[14px] font-medium">
                      {article.authorName}
                    </p>
                    <div className="mt-auto text-[14px]">
                      <ArticleSnippet article={article.content} />
                    </div>
                  </div>
                </Link>
              );
            } else {
              return (
                <Link
                  href={`article/${article.id}`}
                  key={index}
                  className="flex h-[23%] w-full gap-[10px] border-b-[1px] border-[#d1d5db] pl-[14px] hover:translate-y-[-3px] hover:duration-100 sm:w-[23%] sm:border-b-0 sm:border-l-[1px] md:h-[18%]"
                >
                  <div className="flex h-full flex-row items-center gap-[10px] pb-[10px] sm:flex-col sm:items-start sm:pb-0">
                    <p className={`text-[10px]  ${categoryClass}`}>
                      {article.category}
                    </p>
                    <h4 className="line-clamp-4 text-[13px] font-bold sm:text-[15px]">
                      {article.title}
                    </h4>
                  </div>
                  <Image
                    src={article.image}
                    alt="cover image"
                    width={120}
                    height={50}
                    priority={true}
                    className="ml-auto hidden h-[100%] rounded-xl border-2 border-black object-cover object-center shadow-[-3px_3px] shadow-[#0000003b] lg:flex"
                  />
                </Link>
              );
            }
          })}
        </motion.div>
      ) : (
        <TrendingArticleSkeleton />
      )}
    </div>
  );
};

export default TrendingArticles;
