"use client";
import React, { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query, limit } from "firebase/firestore";
import { db } from "@/utils/firebase";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import ArticleSnippet from "./ArticleSnippet";
import monster from "../assets/image/people/monster.svg";
import beanieMan from "../assets/image/people/guy-with-beanie.svg";
import TrendingArticleSkeleton from "@/components/skeleton/TrendingArticleSkeleton";

interface TrendingArticle {
  title: string;
  authorName: string;
  savedCount: number;
  id: string;
  category: string;
  image: string;
  content: string;
}

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
      let data: TrendingArticle[] = [];
      const q = query(
        collection(db, "articles"),
        orderBy("savedCount", "desc"),
        limit(5)
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
    <div className="relative flex flex-col sm:h-[calc(100vh-120px)] w-full pb-[15px] sm:pb-0 shadow-lg border-t-2 border-black bg-gradient-to-t from-white to-[#FCF8E8] z-0">
      <h2 className="w-fit h-fit px-2 py-1 bg-black text-white tracking-[1px] font-medium z-10 ">
        Trending Articles
      </h2>
      <div>
        <Image
          src={monster}
          alt="monster"
          width={200}
          height={300}
          className="absolute top-0 right-0 rotate-180 opacity-40"
        />
      </div>

      <Image
        src={beanieMan}
        alt="boy sitting on legs"
        width={180}
        height={300}
        className={`absolute top-[calc(100vh-380px)] left-0 z-0 opacity-40`}
      />
      {articles.length > 0 ? (
        <motion.div
          initial="hidden"
          animate="show"
          variants={container}
          className="flex flex-wrap md:justify-between h-[92%] gap-[15px] px-[20px] max-w-[1280px] mx-auto sm:[&>*:nth-child(2)]:border-none  z-10"
        >
          {articles.map((article, index) => {
            if (index === 0) {
              return (
                <Link
                  href={`article/${article.id}`}
                  key={index}
                  className="flex flex-col sm:flex-row gap-[10px] sm:gap-[20px] w-full h-[70%] mt-auto border-b-[1px] border-[#d1d5db] pb-[30px] pt-[10px] sm:pt-0 hover:translate-y-[-3px] hover:duration-100"
                >
                  <Image
                    src={article.image}
                    alt="cover image"
                    width={800}
                    height={400}
                    className="basis-1/2 w-full sm:min-w-[60%] object-cover rounded-xl border-black border-2 shadow-[-10px_10px] shadow-[#0000003b]"
                    priority={true}
                  />
                  <div className="flex flex-col gap-[10px]">
                    <p className={`mt-[10px] sm:mt-0 ${categoryClass}`}>
                      {article.category}
                    </p>
                    <h3 className="text-[30px] sm:text-[40px] font-bold line-clamp-5">
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
                  className="flex gap-[10px] w-full sm:w-[23%] h-[23%] md:h-[18%] border-b-[1px] sm:border-b-0 sm:border-l-[1px] border-[#d1d5db] pl-[14px] hover:translate-y-[-3px] hover:duration-100"
                >
                  <div className="flex flex-row items-center sm:items-start sm:flex-col pb-[10px] sm:pb-0 gap-[10px] h-full">
                    <p className={`text-[10px]  ${categoryClass}`}>
                      {article.category}
                    </p>
                    <h4 className="font-bold text-[13px] sm:text-[15px] line-clamp-5">
                      {article.title}
                    </h4>
                  </div>
                  <Image
                    src={article.image}
                    alt="cover image"
                    width={120}
                    height={50}
                    priority={true}
                    className="h-[100%] rounded-xl object-cover object-center ml-auto hidden lg:flex border-black border-2 shadow-[-3px_3px] shadow-[#0000003b]"
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
