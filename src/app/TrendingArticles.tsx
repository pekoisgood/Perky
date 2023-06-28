"use client";
import React, { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query, limit } from "firebase/firestore";
import { db } from "@/utils/firebase";
import Link from "next/link";

interface TrendingArticle {
  title: string;
  authorName: string;
  savedCount: number;
  id: string;
}

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
    <>
      {articles.map((article: TrendingArticle, index: number) => {
        return (
          <Link
            href={`/article/${article.id}`}
            key={index}
            className="border-[1px] border-slate-600 rounded-lg w-full p-2"
          >
            <h2>{article.title}</h2>
            <p>{article.authorName}</p>
            <p>收藏數 : {article.savedCount}</p>
          </Link>
        );
      })}
    </>
  );
};

export default TrendingArticles;
