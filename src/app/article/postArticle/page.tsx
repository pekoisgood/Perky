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
import { db } from "@/utils/firebase";
import {
  DocumentData,
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { redirect } from "next/navigation";

export type Article = {
  title: string;
  content: string;
  category: string;
  tags: string[];
};

const buttonClass = `w-fit h-fit bg-[#245953] text-white px-3 py-1
border-2 border-black rounded-2xl shadow-black shadow-[3px_3px]
hover:cursor-pointer hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none duration-100`;

const Page = () => {
  const { user, isLogin } = useContext(AuthContext);
  const [image, setImage] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState<Boolean>(false);
  const tagRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();
  const postArticle = useAppSelector((state) => state.postArticle.value);

  const handleTag = (action: string, tag?: string) => {
    if (action === "ADD") {
      if (tagRef.current === null || tagRef.current.value === "") return;
      const tagValue = capitalize(tagRef.current.value);
      dispatch(
        handleUpdateArticle({
          action: "UPDATE_TAGS",
          value: tagValue,
        })
      );
    } else if (action === "DELETE" && tag) {
      dispatch(handleUpdateArticle({ action: "DELETE_TAG", value: tag }));
    }
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

      const articleRef = collection(db, "articles");
      await addDoc(articleRef, {
        createdAt: serverTimestamp(),
        authorName: user.name,
        authorUserId: user.id,
        title: postArticle.title,
        content: postArticle.content,
        category: postArticle.category,
        tags: postArticle.tags,
        image: imageUrl,
        userId: user.id,
        userName: user.name,
      });

      for (let i = 0; i < postArticle.tags.length; i++) {
        const tagRef = collection(db, "tags");
        const q = query(tagRef, where("tagName", "==", postArticle.tags[i]));
        const result = await getDocs(q);
        let tag = "";
        result.forEach((doc: DocumentData) => {
          tag = doc.data().tagName;
        });

        if (tag) return;
        await addDoc(collection(db, "tags"), {
          tagName: postArticle.tags[i],
        });
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

  useEffect(() => {
    if (!isLogin) {
      redirect("/auth");
    }
  }, []);

  return (
    <div
      className={`flex flex-col justify-center w-full max-w-[800px] h-full min-h-[calc(100vh-200px)] 
      gap-3 mx-auto my-[50px] p-5 border-2 border-black rounded-3xl shadow-black shadow-[-5px_5px]`}
    >
      <input
        required
        placeholder="Title..."
        className="outline-none px-3 py-2 placeholder:text-slate-200 text-[25px] border-dashed border-2 border-[#245953] rounded-2xl focus:border-solid"
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
      <div className="flex items-center justify-center">
        <label className={buttonClass + " mr-3"}>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files && setImage(e.target.files[0])}
          />
          Add cover
        </label>
        {image && (
          <span className="text-[#245953]">{image.name.slice(0, 15)}...</span>
        )}
      </div>
      <div className="grow mx-auto flex flex-col min-h-[200px] w-full ">
        <TextEditor />
      </div>

      <div className="flex items-center gap-2 mx-auto p-2">
        <label htmlFor="category" className="font-medium">
          Category
        </label>
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
          className={`border-2 border-black rounded-2xl shadow-black shadow-[3px_3px] bg-[#245953] outline-none
          hover:cursor-pointer hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none p-2 text-white`}
        >
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
          <option value="IOS">IOS</option>
          <option value="Android">Android</option>
          <option value="Others">Others</option>
        </select>
      </div>
      <div className="flex flex-wrap w-80% gap-1">
        {postArticle.tags.map((tag, index) => (
          <p
            key={index}
            className="w-fit px-2 py-1 bg-orange-300 border-2 border-black rounded-full "
          >
            {tag}
            <span
              className="ml-3 hover:cursor-pointer"
              onClick={() => handleTag("DELETE", tag)}
            >
              x
            </span>
          </p>
        ))}
      </div>
      <div className="flex items-center gap-2 mx-auto">
        <input
          type="text"
          ref={tagRef}
          placeholder="Add tag..."
          className="px-2 py-1 outline-none border-dashed border-2 border-[#245953] rounded-2xl focus:border-solid"
        />
        <button className={buttonClass} onClick={() => handleTag("ADD")}>
          add tag
        </button>
      </div>
      <button
        className={
          `bg-orange-300 text-black mx-auto mt-[50px] ${
            isProcessing && "hover:cursor-wait"
          }` + buttonClass
        }
        onClick={handleSubmitArticle}
      >
        {isProcessing ? "running..." : "送出"}
      </button>
    </div>
  );
};

export default Page;
