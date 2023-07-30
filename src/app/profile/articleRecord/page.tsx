"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import { motion } from "framer-motion";
import { MdDeleteOutline } from "react-icons/md";
import { doc, deleteDoc } from "firebase/firestore";

import { setRecord } from "@/redux/slice/articleRecordSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import ProfileArticleSkeleton from "@/components/Skeleton/ProfileArticleSkeleton";
import ArticleSnippet from "@/components/Article/ArticleSnippet";
import { Article } from "@/utils/types/types";
import { db } from "@/utils/firebase/firebase";
import { useRouter } from "next/navigation";
import Warning from "@/components/Warning/Warning";
import Button from "@/components/Button/Button";

type DeleteArticleMessage = {
  status: boolean;
  id: string;
};

const Page = () => {
  const [articleRecord, setArticleRecord] = useState<Article[] | null>(null);
  const [confirmDeleteMessage, setConfirmDeletMessage] =
    useState<DeleteArticleMessage>({
      status: false,
      id: "",
    });

  const user = useAppSelector((state) => state.auth.value);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleDeleteArticle = async (id: string) => {
    try {
      await deleteDoc(doc(db, "articles", id));
      const newArticleRecord = articleRecord!.filter(
        (article) => article.id !== id
      );
      setArticleRecord(newArticleRecord ?? []);
    } catch (error) {
      console.error(error);
    }

    setConfirmDeletMessage({ status: false, id: "" });
  };

  useEffect(() => {
    const getArticleRecord = async () => {
      if (user.id) {
        const req = await fetch(`/api/articleRecord?id=${user.id}`);
        const myArticles: Article[] = await req.json();
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

      {articleRecord === null ? (
        <div className="columns-1 sm:columns-2 md:columns-3 gap-x-5 overflow-y-scroll pb-5">
          <ProfileArticleSkeleton />
          <ProfileArticleSkeleton />
          <ProfileArticleSkeleton />
          <ProfileArticleSkeleton />
          <ProfileArticleSkeleton />
          <ProfileArticleSkeleton />
          <ProfileArticleSkeleton />
          <ProfileArticleSkeleton />
          <ProfileArticleSkeleton />
        </div>
      ) : articleRecord.length > 0 ? (
        <>
          <div className="colomns-1 min-[500px]:columns-2 md:columns-3 gap-x-5 overflow-y-scroll pt-[10px] pb-5">
            {articleRecord.map((article) => {
              return (
                <div
                  className="rounded-xl p-1 block bg-[#245953] break-inside-avoid mb-5 shadow-md hover:cursor-pointer"
                  key={article.id}
                  onClick={() => {
                    router.push(`/article/${article.id}`);
                  }}
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
                    className="relative flex flex-col gap-2 h-full justify-center p-3 border-dashed border-2 border-white rounded-lg"
                  >
                    <MdDeleteOutline
                      size={30}
                      className={`absolute top-[5px] right-[5px] bg-white/30 p-1 rounded-lg
                      hover:text-red-400 hover:cursor-pointer
                    `}
                      onClick={(e) => {
                        e.stopPropagation();
                        setConfirmDeletMessage({
                          status: true,
                          id: article.id,
                        });
                      }}
                    />
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
                </div>
              );
            })}
            {confirmDeleteMessage.status && (
              <Warning
                time={0}
                customHandleCloseButton={() =>
                  setConfirmDeletMessage({ status: false, id: "" })
                }
              >
                <div className="flex flex-col gap-3 justify-center items-center">
                  <p>Are you sure you want to delete this article?</p>
                  <div className="flex gap-3 text-center">
                    <Button
                      handleOnClick={() => {
                        handleDeleteArticle(confirmDeleteMessage.id);
                      }}
                    >
                      Yes
                    </Button>
                    <Button
                      handleOnClick={() =>
                        setConfirmDeletMessage({ status: false, id: "" })
                      }
                    >
                      No
                    </Button>
                  </div>
                </div>
              </Warning>
            )}
          </div>
        </>
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
