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
import { motion } from "framer-motion";
import ArticleSnippet from "@/app/ArticleSnippet";
import Image from "next/image";
import Button from "@/components/button/Button";

type Article = {
  title: string;
  id: string;
  authorName: string;
  content: string;
  image: string;
};

const Page = () => {
  const { user } = useContext(AuthContext);
  const [articles, setArticles] = useState<Article[]>([]);

  console.log("arts", articles);

  useEffect(() => {
    console.log(user.id);

    const getArticle = async () => {
      const savedArticles: Article[] = [];
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

      // if (!(articleIds.length > 0)) return;
      // // const articles = async () => {articleIds.map((a, i) => {
      // //   const res: DocumentData = await getDoc(
      // //     doc(db, "articles", articleIds[i])
      // //   );
      // //   console.log(res.data());
      // //   console.log(savedArticles);
      // //   console.log(articleIds[i]);

      // //   return {
      // //     id: res.id,
      // //     authorName: res.data().authorName,
      // //     title: res.data().title,
      // //     content: res.data().content,
      // //     image: res.data().image,
      // //   }
      // })}
      for (let i = 0; i < articleIds.length; i += 1) {
        console.log("i", i);

        const res: DocumentData = await getDoc(
          doc(db, "articles", articleIds[i])
        );
        console.log(res.data());
        console.log(articleIds[i]);
        savedArticles.push({
          id: res.id,
          authorName: res.data().authorName,
          title: res.data().title,
          content: res.data().content,
          image: res.data().image,
        });

        console.log(savedArticles);
      }

      setArticles(savedArticles);
    };

    if (user.id === "") return;
    getArticle();
  }, [user.id]);

  return (
    <div className="h-full w-full flex flex-col items-center gap-3">
      <h2 className="mx-auto w-fit text-[28px] font-semibold tracking-[6px] indent-[6px]">
        Saved Articles
      </h2>
      {articles.length > 0 ? (
        <div className="columns-2 md:columns-3 gap-2 w-full px-3 mt-[50px]">
          {articles.map((article: Article, index: number) => {
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
                className="rounded-xl p-1 block hover:translate-y-[-10px] hover:duration-100 bg-[#1B9C85] mb-3 break-inside-avoid"
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
                      className="object-cover h-full"
                      priority={true}
                    />
                  </div>
                  <p className="font-semibold text-[18px]">{article.title}</p>
                  <p className="text-white pl-1 text-[12px]">
                    <ArticleSnippet article={article.content} />
                  </p>
                </Link>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col w-full h-full items-center gap-2 mt-[50px]">
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
