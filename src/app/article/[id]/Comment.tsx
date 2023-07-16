"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  collection,
  serverTimestamp,
  addDoc,
  query,
  orderBy,
  getDocs,
  onSnapshot,
  DocumentData,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/utils/firebase";
import { AuthContext } from "@/context/AuthContext";
import Button from "@/components/button/Button";
import Image from "next/image";
import { HiPaperAirplane } from "react-icons/hi";
import { PiFinnTheHumanFill } from "react-icons/pi";
import { timeAgo } from "@/utils/func";
import Warning from "@/components/warning/Warning";
import Link from "next/link";

type ArticleComment = {
  comment: string;
  createdAt: Timestamp;
  userName: string;
  userId: string;
  userAvatar: string;
};

const Comment = ({ articleId }: { articleId: string }) => {
  const { user, isLogin } = useContext(AuthContext);
  const [newComment, setNewComment] = useState<string>("");
  const [comments, setComments] = useState<ArticleComment[]>([]);
  const [showNotLoginWarning, setShowNotLoginWarning] = useState(false);

  const CommentRef = collection(db, "articles", articleId, "comments");

  const handleSubmitComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newComment) return;
    if (!isLogin) {
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
      console.log(doc.data());

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
      className={`w-full max-w-[800px] flex flex-col justify-center gap-4 mt-[35px] bg-[#ebebeb] 
    border-2 rounded-2xl border-[#245953] p-5 shadow-[#245953] shadow-[-5px_5px]`}
    >
      <h1 className="w-fit mx-auto font-semibold text-[20px] tracking-[2px] indent-[2px]">
        Comment
      </h1>
      <form
        onSubmit={(e) => handleSubmitComment(e)}
        className="flex gap-2 justify-center items-center"
      >
        <input
          type="text"
          value={newComment}
          className="w-[95%] h-[42px] p-2 border-[1px] border-[#245953] rounded-md focus:border-2 outline-none"
          onChange={(e) => setNewComment(e.target.value)}
        />
        <Button
          customLayout="h-[42px] w-[42px] flex items-center justify-center rotate-90 shadow-[2px_2px]"
          // handleOnClick={handleSubmitComment}
        >
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
                  className="flex flex-col sm:flex-row gap-3 items-center border-2 border-dashed border-orange-300 rounded-tl-xl rounded-tr-xl rounded-br-xl p-2 bg-white text-center sm:text-start"
                >
                  {comment.userAvatar ? (
                    <Image
                      src={comment.userAvatar}
                      alt="avatar"
                      width={30}
                      height={30}
                      className="rounded-full overflow-hidden min-w-[30px] h-[30px] object-cover"
                    />
                  ) : (
                    <PiFinnTheHumanFill size={30} className="min-w-[30px]" />
                  )}
                  <div className="flex flex-col gap-1">
                    <p className="text-black text-[12px] sm:text-[14px] font-semibold">
                      {comment.userName}
                      <span className="text-[8px] sm:text-[10px] ml-2 font-normal">
                        {comment.createdAt ?? false
                          ? timeAgo(new Date(comment.createdAt.seconds * 1000))
                          : "now"}
                      </span>
                    </p>
                    <p className="text-[16px] sm:text-[18px] break-words hyphens-auto">
                      {comment.comment}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="w-fit mx-auto text-[14px] text-black tracking-[1px]">
            There&apos;s no comment... Maybe you can be the first one!
          </p>
        )}
      </div>
      {showNotLoginWarning && (
        <Warning time={0} customLayout="flex flex-col gap-3 items-center">
          <p>You have to login to comment on this article!</p>
          <Button>
            <Link href="/auth">Go to Login</Link>
          </Button>
        </Warning>
      )}
    </div>
  );
};

export default Comment;
