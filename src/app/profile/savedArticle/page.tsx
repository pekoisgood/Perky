"use client";
import React, { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/utils/firebase";
import Link from "next/link";

interface Article {
  id: string;
  title: string;
}

const Page = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  useEffect(() => {
    const getArticle = async () => {
      let data: Article[] = [];
      const q = query(
        collection(
          db,
          "users",
          "bGmbmzaDDaO6lbnInODlaCfb4V63",
          "savedArticles"
        ),
        orderBy("createdAt", "desc")
      );
      const result = await getDocs(q);
      result.forEach((doc) => {
        data.push({
          id: doc.id,
          title: doc.data().title,
        });
      });
      setArticles(data);
    };
    getArticle();
  }, []);
  return (
    <div className="h-[1px] min-h-screen flex flex-col items-center mt-5 gap-3">
      <h2>我的收藏好文</h2>
      <div className="grid grid-cols-2 gap-2">
        {articles.map((article: Article, index: number) => {
          return (
            <Link
              href={`/article/${article.id}`}
              key={index}
              className="p-2 bg-slate-100 rounded-lg"
            >
              <p>{article.title}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Page;
