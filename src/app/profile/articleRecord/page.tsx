"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import { motion } from "framer-motion";
import { MdDeleteOutline } from "react-icons/md";
import {
  doc,
  deleteDoc,
  collection,
  getDocs,
  query,
  where,
  collectionGroup,
} from "firebase/firestore";

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
  const [confirmDeleteMessage, setConfirmDeleteMessage] =
    useState<DeleteArticleMessage>({
      status: false,
      id: "",
    });

  const user = useAppSelector((state) => state.auth.value);
  const dispatch = useAppDispatch();
  const router = useRouter();
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

  const handleDeleteArticle = async (id: string) => {
    try {
      await deleteDoc(doc(db, "articles", id));

      const ref = collection(db, "articles", id, "savedUsers");
      const snapshot = await getDocs(ref);
      const savedUsers: string[] = [];
      if (!snapshot.empty) {
        snapshot.forEach(async (doc) => {
          savedUsers.push(doc.id);
        });
        for (let i = 0; i < savedUsers.length; i++) {
          await deleteDoc(doc(db, "articles", id, "savedUsers", savedUsers[i]));
        }
      }

      getArticleRecord();
    } catch (error) {
      console.error(error);
    }

    setConfirmDeleteMessage({ status: false, id: "" });
  };

  useEffect(() => {
    getArticleRecord();
  }, [user.id]);

  return (
    <div className="relative mt-[20px] w-full">
      <div className="sticky top-[20px] z-10 w-full text-center">
        <h1 className="mx-auto mb-[30px] w-fit rounded-full bg-white/60 px-5 text-[28px] font-bold tracking-[4px]">
          Article Record
        </h1>
      </div>

      {articleRecord === null ? (
        <div className="columns-1 gap-x-5 overflow-y-scroll pb-5 sm:columns-2 md:columns-3">
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
          <div className="colomns-1 gap-x-5 overflow-y-scroll pb-5 pt-[10px] min-[500px]:columns-2 md:columns-3">
            {articleRecord.map((article) => {
              return (
                <div
                  className="mb-5 block break-inside-avoid rounded-xl bg-[#245953] p-1 shadow-md hover:cursor-pointer"
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
                    className="relative flex h-full flex-col justify-center gap-2 rounded-lg border-2 border-dashed border-white p-3"
                  >
                    <MdDeleteOutline
                      size={30}
                      className={`absolute right-[5px] top-[5px] rounded-lg bg-white/30 p-1
                      hover:cursor-pointer hover:text-red-400
                    `}
                      onClick={(e) => {
                        e.stopPropagation();
                        setConfirmDeleteMessage({
                          status: true,
                          id: article.id,
                        });
                      }}
                    />
                    <div className="mx-auto h-[100px] w-full overflow-hidden rounded-2xl">
                      <Image
                        src={article.image}
                        alt="cover image"
                        width={400}
                        height={300}
                        className="h-full w-full object-cover"
                        priority={true}
                      />
                    </div>
                    <p className="hyphens-auto break-words text-[18px] font-semibold text-white">
                      {article.title[0].toUpperCase() + article.title.slice(1)}
                    </p>
                    <div className="pl-1 text-[12px] text-[#eee]">
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
                  setConfirmDeleteMessage({ status: false, id: "" })
                }
              >
                <div className="flex flex-col items-center justify-center gap-3">
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
                        setConfirmDeleteMessage({ status: false, id: "" })
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
        <div className="flex h-full items-center justify-center text-center text-[#245953]">
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
