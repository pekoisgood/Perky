"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  collection,
  serverTimestamp,
  addDoc,
  query,
  orderBy,
  getDocs,
} from "firebase/firestore";
import { db } from "@/utils/firebase";
import { AuthContext } from "@/context/AuthContext";

type ArticleComment = {
  comment: string;
  createdAt: string;
  userName: string;
  userId: string;
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
    });

    setNewComment("");
  };

  useEffect(() => {
    const q = query(CommentRef, orderBy("createdAt", "desc"));
    const commentsData: ArticleComment[] = [];

    const getComments = async () => {
      const result = await getDocs(q);
      result.forEach((doc) => {
        commentsData.push({
          comment: doc.data().comment,
          userName: doc.data().userName,
          userId: doc.data().userId,
          createdAt: doc.data().createdAt.toDate().toLocaleString(),
        });
      });
      setComments(commentsData);
    };

    getComments();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <h1>留言專區</h1>
      <div className="flex flex-col gap-2">
        {comments.length > 0 && (
          <div className="flex flex-col gap-2">
            {comments.map((comment, index) => {
              return (
                <div key={index} className="border-[1px] border-slate-900 p-2">
                  <p>{comment.userName}</p>
                  <p>{comment.userId}</p>
                  <p>{comment.comment}</p>
                  <p>{comment.createdAt}</p>
                </div>
              );
            })}
          </div>
        )}
        <div>
          <label>我要留言</label>
          <input
            type="text"
            className="border-[1px] rounded-md border-slate-400 p-1"
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button onClick={handleSubmitComment}>送出</button>
        </div>
      </div>
    </div>
  );
};

export default Comment;
