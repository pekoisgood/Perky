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
      delayChildren: 1,
      staggerChildren: 0.5,
    },
  },
};

const item = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    trasition: { delay: 0.2, stiffness: 120, type: spring },
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
      className="flex flex-col gap-3 w-fit"
    >
      {articles.map((article: TrendingArticle, index: number) => {
        return (
          <Link href={`/article/${article.id}`} key={index} className="flex">
            <motion.div
              variants={item}
              whileHover={{
                scale: 1.1,
                transition: { type: "spring", stiffness: 300, duration: 0.5 },
              }}
              className="flex flex-col border-[1px] border-slate-600 rounded-lg w-[90%] p-2 mx-auto hover:scale-110 bg-black text-white"
            >
              <p className="text-[10px] text-bold w-fit mr-auto mb-2 font-mono">{`<h${
                index + 1
              }>`}</p>
              <h2 className="text-bold text-[15px]">{article.title}</h2>
              <p className="text-[12px]">{article.authorName}</p>
              <p className="text-[12px]">收藏數 : {article.savedCount}</p>
              <p className="text-[10px] text-bold w-fit ml-auto mt-2 font-mono">{`</h${
                index + 1
              }>`}</p>
            </motion.div>
          </Link>
        );
      })}
    </motion.div>
  );
};

export default TrendingArticles;
