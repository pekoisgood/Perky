"use client";

import { AuthContext } from "@/context/AuthContext";
import { Timestamp } from "firebase/firestore";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import ArticleSnippet from "@/app/ArticleSnippet";
import Image from "next/image";

type Articles = {
  id: string;
  authorName: string;
  category: string[];
  authorUserId: string;
  content: string;
  createdAt: Timestamp;
  tags: string[];
  title: string;
  image: string;
  starCounts?: number;
};

const Page = () => {
  const { user } = useContext(AuthContext);
  const [articleRecord, setArticleRecord] = useState<Articles[]>([]);

  useEffect(() => {
    const getArticleRecord = async () => {
      if (user.id) {
        const req = await fetch(`/api/articleRecord?id=${user.id}`);
        const myArticles: Articles[] = await req.json();
        setArticleRecord(myArticles);
      }
    };

    getArticleRecord();
  }, [user.id]);

  return (
    <div className="relative">
      <h1 className="mx-auto w-fit text-[28px] font-semibold tracking-[6px] indent-[6px] mb-[50px]">
        發文紀錄
      </h1>
      <Link
        href="/article/postArticle"
        className="absolute top-[10px] right-0 group w-[65px] h-[35px] flex justify-center items-center bg-[#3C486B] text-white rounded-md py-1 hover:scale-110 z-0 border-2 border-black"
      >
        <div className="relative w-[65px] h-[35px]">
          <div className="flex items-center h-full relative before:absolute before:block before:top-0 before:left-[-2px] before:content-[ ] before:w-[65px] before:h-[35px] before:bg-[#677cbefb] before:rounded-md px-[6px] py-1 z-20 before:border-2 before:border-black before:hover:skew-x-12 before:hover:h-[32px] before:hover:top-[3px] before:hover:left-[-7px] group-hover:duration-100">
            <span className="inline-block relative z-100 text-[12px] group-hover:left-[-6px] group-hover:duration-100">
              我要發文
            </span>
          </div>
          <div className="absolute top-[-4px] left-[-2px] w-[20px] h-[9px] bg-[#3C486B] rounded-[40%_40%_0_0/10px_10px_0_0] z-10 border-black border-l-2 border-t-2" />
        </div>
      </Link>
      <div className="columns-2 md:columns-3 gap-x-5">
        {articleRecord.length > 0 &&
          articleRecord.map((article, index) => {
            return (
              <Link
                href={`/article/${article.id}`}
                className="rounded-xl p-1 block hover:translate-y-[-10px] hover:duration-100 bg-[#1B9C85] break-inside-avoid mb-5"
                key={article.id}
              >
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
                  className="flex flex-col gap-2 h-full justify-center p-3 border-dashed border-2 border-white rounded-lg"
                >
                  <div className="w-full h-[100px] mx-auto object-cover object-center overflow-hidden rounded-2xl">
                    <Image
                      src={article.image}
                      alt="cover image"
                      width={400}
                      height={300}
                      className="object-cover"
                      loading="lazy"
                    />
                  </div>
                  <p className="font-semibold text-[18px]">
                    {article.title[0].toUpperCase() + article.title.slice(1)}
                  </p>
                  <div className="text-white pl-1 text-[12px]">
                    <ArticleSnippet article={article.content} />
                  </div>
                </motion.div>
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default Page;
