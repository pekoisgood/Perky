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
} from "firebase/firestore";
import { db } from "@/utils/firebase";
import { AuthContext } from "@/context/AuthContext";
import Button from "@/components/button/Button";
import Image from "next/image";
import { HiPaperAirplane } from "react-icons/hi";
import { PiFinnTheHumanFill } from "react-icons/pi";

type ArticleComment = {
  comment: string;
  createdAt: string;
  userName: string;
  userId: string;
  userAvatar: string;
};

const Comment = ({ articleId }: { articleId: string }) => {
  const { user } = useContext(AuthContext);
  const [newComment, setNewComment] = useState<string>("");
  const [comments, setComments] = useState<ArticleComment[]>([]);

  const CommentRef = collection(db, "articles", articleId, "comments");

  const handleSubmitComment = async () => {
    if (!newComment) return;

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
        createdAt: doc.data().createdAt?.toDate().toLocaleString() ?? "now",
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
          // console.log(change.doc.data().createdAt);

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
      className={`w-full max-w-[630px] flex flex-col justify-center gap-4 mt-[35px] bg-[#ebebeb] 
    border-2 rounded-2xl border-[#245953] p-5 shadow-[#245953] shadow-[-5px_5px]`}
    >
      <h1 className="w-fit mx-auto font-semibold text-[20px] tracking-[2px] indent-[2px]">
        留言
      </h1>
      <div className="flex gap-2 justify-center items-center">
        <input
          type="text"
          value={newComment}
          className="border-[1px] border-[#245953] rounded-md shadow-[#245953] shadow-[-2px_2px] p-2 w-[93%] focus:shadow-none focus-translate-x-[-2px] focus:translate-y-[2px] outline-none"
          onChange={(e) => setNewComment(e.target.value)}
        />
        <Button handleOnClick={handleSubmitComment}>
          <HiPaperAirplane size={20} />
        </Button>
      </div>
      <div className="flex flex-col gap-2">
        {comments.length > 0 ? (
          <div className="flex flex-col gap-3">
            {comments.map((comment, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row gap-3 items-center border-2 border-dashed border-orange-300 rounded-tl-xl rounded-tr-xl rounded-br-xl p-2 bg-white text-center sm:text-start"
                >
                  <div className="flex flex-col gap-2 justify-center items-center">
                    {comment.userAvatar !== " " ? (
                      <Image
                        src={comment.userAvatar}
                        alt="avatar"
                        width={30}
                        height={30}
                        className="rounded-full overflow-hidden"
                      />
                    ) : (
                      <PiFinnTheHumanFill size={30} />
                    )}
                    <p className="text-black text-[10px] sm:text-[12px]">
                      {comment.userName}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[8px] sm:text-[12px]">
                      {comment.createdAt}
                    </span>
                    <p className="text-[14px] sm:text-[16px]">
                      {comment.comment}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="w-fit mx-auto text-[14px] text-[#ECECEC] italic tracking-[1px]">
            ... 快來當第一個留言的人！
          </p>
        )}
      </div>
    </div>
  );
};

export default Comment;
