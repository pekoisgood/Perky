"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  DocumentData,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "@/utils/firebase";
import Link from "next/link";
import { AuthContext } from "@/context/AuthContext";

type Article = {
  title: string;
  id: string;
  authorName: string;
};

const Page = () => {
  const { user } = useContext(AuthContext);
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const getArticle = async () => {
      const savedArticles: Article[] = [];
      const articleIds: string[] = [];
      const q = query(
        collection(db, "users", user.id, "savedArticles"),
        orderBy("createdAt", "desc")
      );
      const result = await getDocs(q);
      result.forEach((doc) => {
        console.log(doc.id, doc.data());

        articleIds.push(doc.id);
      });

      if (!(articleIds.length > 0)) return;
      for (let i = 0; i < articleIds.length; i++) {
        console.log(typeof articleIds[i]);

        const res: DocumentData = await getDoc(
          doc(db, "articles", articleIds[i])
        );
        savedArticles.push({
          id: res.id,
          authorName: res.data().authorName,
          title: res.data().title,
        });
      }

      setArticles(savedArticles);
    };
    if (!user.id) return;
    getArticle();
  }, [user.id]);

  return (
    <div className="h-[1px] min-h-screen flex flex-col items-center mt-5 gap-3">
      <h2>我的收藏好文</h2>
      <div className="grid grid-cols-2 gap-2">
        {articles.length > 0 &&
          articles.map((article: Article, index: number) => {
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
