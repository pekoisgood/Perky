"use client";

import { AuthContext } from "@/context/AuthContext";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import ArticleSnippet from "@/app/ArticleSnippet";
import Image from "next/image";
import { Articles, setRecord } from "@/redux/slice/articleRecordSlice";
import { useAppDispatch } from "@/redux/hooks";
import ProfileArticleSkeleton from "@/components/skeleton/ProfileArticleSkeleton";

const Page = () => {
  const { user } = useContext(AuthContext);
  const [articleRecord, setArticleRecord] = useState<Articles[] | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getArticleRecord = async () => {
      if (user.id) {
        const req = await fetch(`/api/articleRecord?id=${user.id}`);
        const myArticles: Articles[] = await req.json();
        if (!myArticles) {
          setArticleRecord([]);
          return;
        }
        setArticleRecord(myArticles);
        dispatch(setRecord(myArticles));
      }
    };

    getArticleRecord();
  }, [user.id]);

  return (
    <div className="w-full relative mt-[20px]">
      <div className="sticky top-[20px] w-full text-center">
        <h1 className="bg-white/60 w-fit mx-auto text-[28px] font-bold tracking-[4px] rounded-full px-5 mb-[30px]">
          Article Record
        </h1>
      </div>

      <Link
        href="/article/postArticle"
        className="absolute top-[10px] right-[10px] group w-[65px] h-[35px] flex justify-center items-center bg-[#245953] text-white rounded-md py-1 hover:scale-110 z-0 border-2 border-black"
      >
        <div className="relative w-[65px] h-[35px]">
          <div className="flex items-center h-full relative before:absolute before:block before:top-0 before:left-[-2px] before:content-[ ] before:w-[65px] before:h-[35px] before:bg-[#245953] before:rounded-md px-[6px] py-1 z-20 before:border-2 before:border-black before:hover:skew-x-12 before:hover:h-[32px] before:hover:top-[3px] before:hover:left-[-7px] group-hover:duration-100">
            <span className="inline-block relative z-100 text-[12px] group-hover:left-[-6px] group-hover:duration-100 pl-[7px]">
              Post +
            </span>
          </div>
          <div className="absolute top-[-4px] left-[-2px] w-[20px] h-[9px] bg-[#245953] rounded-[40%_40%_0_0/10px_10px_0_0] z-10 border-black border-l-2 border-t-2" />
        </div>
      </Link>
      {articleRecord === null ? (
        <div className="columns-1 sm:columns-2 md:columns-3 gap-x-5 overflow-y-scroll pb-5">
          <ProfileArticleSkeleton />
          <ProfileArticleSkeleton />
          <ProfileArticleSkeleton />
        </div>
      ) : articleRecord.length > 0 ? (
        <div className="colomns-1 min-[500px]:columns-2 md:columns-3 gap-x-5 overflow-y-scroll pt-[10px] pb-5">
          {articleRecord.map((article) => {
            return (
              <Link
                href={`/article/${article.id}`}
                className="rounded-xl p-1 block hover:translate-y-[-10px] hover:duration-150 bg-[#245953] break-inside-avoid mb-5 shadow-md"
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
                  <p className="font-semibold text-[18px] text-white break-words hyphens-auto">
                    {article.title[0].toUpperCase() + article.title.slice(1)}
                  </p>
                  <div className="text-[#eee] pl-1 text-[12px]">
                    <ArticleSnippet article={article.content} />
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="flex justify-center items-center h-full text-[#245953] text-center">
          <p>
            There&apos;s no article yet!! <br />
            Go to post your first article!!
          </p>
        </div>
      )}
    </div>
  );
};

export default Page;
