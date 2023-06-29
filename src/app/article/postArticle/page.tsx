"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import TextEditor from "./TextEditor";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  handlePostArticle,
  handleUpdateArticle,
} from "@/redux/slice/postArticleSlice";
import { storage } from "@/utils/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { capitalize } from "@/utils/func";
import { AuthContext } from "@/context/AuthContext";

export type Article = {
  title: string;
  content: string;
  category: string;
  tags: string[];
};

const Page = () => {
  const { user } = useContext(AuthContext);
  const [image, setImage] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState<Boolean>(false);
  const tagRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();
  const postArticle = useAppSelector((state) => state.postArticle.value);

  const handleAddTag = () => {
    if (tagRef.current === null || tagRef.current.value === "") return;

    const tag = capitalize(tagRef.current.value);

    dispatch(
      handleUpdateArticle({
        action: "UPDATE_TAGS",
        value: tag,
      })
    );
  };

  const handleSubmitArticle = async () => {
    setIsProcessing(true);
    if (Object.values(postArticle).includes("") || !image) {
      window.alert("請填寫完整");
      setIsProcessing(false);
      return;
    }
    if (image && user.id && user.name) {
      const storageRef = ref(storage, `${user.id}-${image.name}`);
      await uploadBytes(storageRef, image);
      const pathReference = ref(storage, `${user.id}-${image.name}`);
      const imageUrl = await getDownloadURL(pathReference).then(
        (downloadURL: string) => {
          return downloadURL;
        }
      );

      const res = await fetch("/api/postArticle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: postArticle.title,
          content: postArticle.content,
          category: postArticle.category,
          tags: postArticle.tags,
          image: imageUrl,
          userId: user.id,
          userName: user.name,
        }),
      });

      if (res.status !== 200) {
        window.alert(`Error: ${res.statusText}`);
        setIsProcessing(false);
        return;
      }

      dispatch(handlePostArticle());
      setIsProcessing(false);
      window.alert("發文成功");
    }
  };

  useEffect(() => {
    if (tagRef.current) {
      tagRef.current.value = "";
    }
  }, [postArticle.tags]);

  return (
    <div className="flex flex-col gap-5 w-[800px] max-w-screen mx-auto mt-10 border-[1px]">
      <h1 className="mx-auto border-[1px]">我要發文</h1>
      <div className="flex flex-col gap-2">
        <input
          required
          placeholder="標題"
          className="border-[1px] px-3 py-2"
          value={postArticle.title}
          onChange={(e) =>
            dispatch(
              handleUpdateArticle({
                action: "UPDATE_INPUTS",
                key: "title",
                value: e.target.value,
              })
            )
          }
        />
        <div>
          <label className="mr-5">上傳封面照</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => e.target.files && setImage(e.target.files[0])}
          />
        </div>
        <TextEditor />
        <div className="flex gap-2 mx-auto border-[1px] border-slate-500 p-2">
          <label htmlFor="category">Category</label>
          <select
            required
            id="category"
            name="category"
            onChange={(e) => {
              dispatch(
                handleUpdateArticle({
                  action: "UPDATE_INPUTS",
                  key: "category",
                  value: e.target.value,
                })
              );
            }}
            className="border-[1px] border-slate-200 rounded-sm"
          >
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="IOS">IOS</option>
            <option value="Android">Android</option>
            <option value="Others">Others</option>
          </select>
        </div>
        <div className="flex flex-wrap w-[300px] gap-1">
          {postArticle.tags.map((tag, index) => (
            <p key={index}>{tag}</p>
          ))}
        </div>
        <div className="flex gap-2 mx-auto">
          <label htmlFor="tag">Tag : </label>
          <input
            type="text"
            ref={tagRef}
            className="border-[1px] border-slate-200 rounded-sm"
          />
          <button onClick={() => handleAddTag()}>add tag</button>
        </div>
        <button onClick={handleSubmitArticle}>
          {isProcessing ? "running..." : "送出"}
        </button>
      </div>
    </div>
  );
};

export default Page;
