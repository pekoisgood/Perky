"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  collection,
  serverTimestamp,
  addDoc,
  query,
  orderBy,
  getDocs,
  onSnapshot,
  DocumentData,
} from "firebase/firestore";
import { HiPaperAirplane } from "react-icons/hi";
import { PiFinnTheHumanFill } from "react-icons/pi";

import Button from "@/components/Button/Button";
import Warning from "@/components/Warning/Warning";
import { timeAgo } from "@/utils/date/dateFc";
import { db } from "@/utils/firebase/firebase";
import { ArticleComment } from "@/utils/types/types";
import { useAppSelector } from "@/redux/hooks";

const Comment = ({ articleId }: { articleId: string }) => {
  const [newComment, setNewComment] = useState<string>("");
  const [comments, setComments] = useState<ArticleComment[]>([]);
  const [showNotLoginWarning, setShowNotLoginWarning] = useState(false);

  const user = useAppSelector((state) => state.auth.value);
  const CommentRef = collection(db, "articles", articleId, "comments");

  const handleSubmitComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newComment) return;
    if (!user.isLogin) {
      setShowNotLoginWarning(true);
      return;
    }

    await addDoc(CommentRef, {
      comment: newComment,
      createdAt: serverTimestamp(),
      userName: user.name,
      userId: user.id,
      userAvatar: user.avatar,
    });

    setNewComment("");
  };

  useEffect(() => {
    const q = query(CommentRef, orderBy("createdAt", "desc"));
    const commentsData: ArticleComment[] = [];
    const docData = (doc: DocumentData) => {
      return {
        comment: doc.data().comment,
        userName: doc.data().userName,
        userId: doc.data().userId,
        userAvatar: doc.data().userAvatar,
        createdAt: doc.data().createdAt,
      };
    };

    const getComments = async () => {
      const result = await getDocs(q);
      result.forEach((doc) => {
        commentsData.push(docData(doc));
      });
      setComments(commentsData);
    };

    const unsub = onSnapshot(CommentRef, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          setComments((prev) => {
            return [docData(change.doc), ...prev];
          });
        }
      });
    });

    getComments();
    return () => {
      unsub();
    };
  }, []);

  return (
    <div
      className={`mt-[35px] flex w-full max-w-[800px] flex-col justify-center gap-4 rounded-2xl 
    border-2 border-[#245953] bg-[#ebebeb] p-5 shadow-[-5px_5px] shadow-[#245953]`}
    >
      <h1 className="mx-auto w-fit indent-[2px] text-[20px] font-semibold tracking-[2px]">
        Comment
      </h1>
      <form
        onSubmit={(e) => handleSubmitComment(e)}
        className="flex items-center justify-center gap-2"
      >
        <input
          type="text"
          id="comment"
          value={newComment}
          className="h-[42px] w-[95%] rounded-md border-[1px] border-[#245953] p-2 outline-none focus:border-2"
          onChange={(e) => setNewComment(e.target.value)}
        />
        <Button customLayout="h-[42px] w-[42px] flex items-center justify-center rotate-90 shadow-[2px_2px]">
          <HiPaperAirplane size={35} />
        </Button>
      </form>
      <div className="flex flex-col gap-2">
        {comments.length > 0 ? (
          <div className="flex flex-col gap-3">
            {comments.map((comment, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-col items-center gap-3 rounded-br-xl rounded-tl-xl rounded-tr-xl border-2 border-dashed border-orange-300 bg-white p-2 text-center sm:flex-row sm:text-start"
                >
                  {comment.userAvatar ? (
                    <Image
                      src={comment.userAvatar}
                      alt="avatar"
                      width={30}
                      height={30}
                      className="h-[30px] min-w-[30px] overflow-hidden rounded-full border-[1px] border-black object-cover"
                    />
                  ) : (
                    <PiFinnTheHumanFill
                      size={30}
                      className="min-w-[30px] rounded-full border-[1px] border-black"
                    />
                  )}
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center text-[12px] font-semibold text-black sm:text-[14px]">
                      {comment.userName}
                      <span className="ml-2 text-[8px] font-normal sm:text-[10px]">
                        {(comment.createdAt ?? false)
                          ? timeAgo(
                              new Date(comment.createdAt.seconds * 1000),
                              new Date(),
                            )
                          : "now"}
                      </span>
                    </div>
                    <p className="hyphens-auto break-words text-[16px] sm:text-[18px]">
                      {comment.comment}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="mx-auto w-fit text-[14px] tracking-[1px] text-black">
            There&apos;s no comment... Maybe you can be the first one!
          </p>
        )}
      </div>
      {showNotLoginWarning && (
        <Warning
          time={0}
          customLayout="flex flex-col gap-3 items-center fixed top-[50%] right-[50%] translate-x-[50%] translate-y-[-50%] p-10 justify-center
          border-2 border-black rounded-xl bg-[white] text-black font-bold w-fit h-fit"
          customHandleCloseButton={() => setShowNotLoginWarning(false)}
        >
          <p>You have to login to comment on this article!</p>
          <Button id={"comment"}>
            <Link href="/auth" onClick={() => setShowNotLoginWarning(false)}>
              Go to Login
            </Link>
          </Button>
        </Warning>
      )}
    </div>
  );
};

export default Comment;
