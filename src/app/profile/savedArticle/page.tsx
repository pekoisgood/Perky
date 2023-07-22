"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import {
  DocumentData,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { motion } from "framer-motion";
import ArticleSnippet from "@/app/ArticleSnippet";
import Button from "@/components/button/Button";
import ProfileArticleSkeleton from "@/components/skeleton/ProfileArticleSkeleton";
import { db } from "@/utils/firebase/firebase";
import { SavedArticle } from "@/utils/types/types";
import { useAppSelector } from "@/redux/hooks";

const Page = () => {
  const [articles, setArticles] = useState<SavedArticle[] | null>(null);

  const user = useAppSelector((state) => state.auth.value);

  useEffect(() => {
    const getArticle = async () => {
      const savedArticles: SavedArticle[] = [];
      const articleIds: string[] = [];
      const q = query(
        collection(db, "users", user.id, "savedArticles"),
        orderBy("createdAt", "desc")
      );
      const result = await getDocs(q);
      result.forEach((doc) => {
        articleIds.push(doc.id);
      });

      console.log(articleIds.length);
      if (articleIds.length === 0) {
        setArticles([]);
        return;
      }

      for (let i = 0; i < articleIds.length; i += 1) {
        const res: DocumentData = await getDoc(
          doc(db, "articles", articleIds[i])
        );
        console.log(i, articleIds[i], res.data());

        savedArticles.push({
          id: res.id,
          authorName: res.data().authorName,
          title: res.data().title,
          content: res.data().content,
          image: res.data().image,
          category: res.data().category,
        });
      }

      setArticles(savedArticles);
    };

    if (user.id === "") return;
    getArticle();
  }, [user.id]);

  return (
    <div className="w-full mt-[20px] relative overflow-y-scroll">
      <h1
        className={`sticky top-[20px] left-[50%] translate-x-[-50%] bg-white/60 w-fit text-[28px] font-bold tracking-[4px] rounded-full px-5 mb-[30px]
        lg:left-[calc(50%-200px)] lg:right-0 lg:translate-x-[50%]
      `}
      >
        Saved Articles
      </h1>
      {articles === null ? (
        <div className="columns-2 md:columns-3 gap-2 w-full px-3 mt-[50px]">
          <ProfileArticleSkeleton />
          <ProfileArticleSkeleton />
          <ProfileArticleSkeleton />
        </div>
      ) : articles.length > 0 ? (
        <div className="columns-2 md:columns-3 gap-2 w-full px-3 mt-[50px]">
          {articles.map((article: SavedArticle, index: number) => {
            return (
              <motion.div
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  type: "ease",
                  stiffness: 130,
                  duration: 1,
                }}
                key={index}
                className="rounded-xl p-1 block shadow-md hover:translate-y-[-10px] hover:duration-150 bg-[#245953] mb-3 break-inside-avoid"
              >
                <Link
                  href={`/article/${article.id}`}
                  className="flex flex-col gap-2 h-full justify-center p-3 border-dashed border-2 border-white rounded-lg"
                >
                  <div className="w-full h-[100px] mx-auto overflow-hidden rounded-2xl">
                    <Image
                      src={article.image}
                      alt="cover image"
                      width={400}
                      height={300}
                      className="object-cover h-full w-full"
                      priority={true}
                    />
                  </div>
                  <p className="font-semibold text-[18px] text-white tracking-[1px]">
                    {article.title}
                  </p>
                  <p className="text-[#eee] pl-1 text-[12px]">
                    <ArticleSnippet article={article.content} />
                  </p>
                </Link>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col w-full h-full items-center gap-2 mt-[50px] font-medium">
          <p className="text-[#245953]">There is no article saved yet...</p>
          <Link href="/">
            <Button>Let&apos;s go find some stunning articles!</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Page;
