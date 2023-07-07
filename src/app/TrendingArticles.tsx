"use client";
import React, { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query, limit } from "firebase/firestore";
import { db } from "@/utils/firebase";
import Link from "next/link";
import { motion, spring } from "framer-motion";

interface TrendingArticle {
  title: string;
  authorName: string;
  savedCount: number;
  id: string;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delay: 0.8,
      delayChildren: 1,
      staggerChildren: 0.5,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: -100 },
  show: {
    opacity: 1,
    y: 0,
    trasition: { type: spring, duration: 1, delay: 2, stiffness: 120 },
  },
};

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
        });
      });
      setArticles(data);
    };
    getArticle();
  }, []);

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={container}
      className="flex flex-col gap-3 h-fit w-[95%] p-4"
    >
      {articles.map((article: TrendingArticle, index: number) => {
        return (
          <motion.div
            key={index}
            variants={item}
            whileHover={{
              scale: 1.1,
              transition: { type: "spring", stiffness: 300, duration: 0.5 },
            }}
            className="flex p-[5px] bg-[#435B66] rounded-xl hover:scale-110 shadow-[-5px_5px] shadow-black"
          >
            <Link
              href={`/article/${article.id}`}
              className="flex flex-col rounded-lg w-[95%] px-2 mx-auto text-white border-dashed border-2 border-white"
            >
              <p className="text-[10px] text-bold w-fit mr-auto mb-1 font-mono text-[#FFD89C]">{`<h${
                index + 1
              }>`}</p>
              <h2 className="text-bold text-[15px]">{article.title}</h2>
              <div className="flex justify-between">
                <p className="text-[12px] hidden lg:flex">
                  {article.authorName}
                </p>
                <p className="text-[12px] hidden lg:flex">
                  Saved : {article.savedCount}
                </p>
              </div>
              <p className="text-[10px] text-bold w-fit ml-auto mt-1 font-mono text-[#FFD89C]">{`</h${
                index + 1
              }>`}</p>
            </Link>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default TrendingArticles;
