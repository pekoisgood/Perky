"use client";
import Markdown from "@/components/Markdown";
import React, { useEffect, useRef, useState } from "react";

export type Article = {
  title: string;
  content: string;
  category: string;
  tags: string[];
};

const Page = () => {
  const [article, setArticle] = useState<Article>({
    title: "",
    content: "",
    category: "frontend",
    tags: [],
  });
  const [preview, setPreview] = useState<boolean>(false);
  console.log(article);

  const tagRef = useRef<HTMLInputElement | null>(null);

  const handleAddTag = () => {
    if (tagRef.current === null || tagRef.current.value === "") return;
    if (!article.tags) {
      setArticle((prev) => {
        return { ...prev, tags: [...prev.tags, tagRef.current!.value] };
      });
    } else {
      setArticle((prev) => {
        return { ...prev, tags: [tagRef.current!.value] };
      });
    }
  };

  const click = async () => {
    console.log("hi");

    if (Object.values(article).includes("")) {
      return;
    }
    console.log("post");

    await fetch("/api/postArticle", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: article.title,
        content: article.content,
        category: article.category,
        tags: article.tags,
      }),
    });

    setArticle({
      title: "",
      content: "",
      category: "frontend",
      tags: [],
    });
  };

  useEffect(() => {
    if (tagRef.current) {
      tagRef.current.value = "";
    }
  }, [article.tags]);

  return (
    <div className="flex flex-col gap-2 w-fit mx-auto mt-10 border-[1px]">
      <h1 className="mx-auto border-[1px]">我要發文</h1>
      <div className="flex gap-1 mx-auto">
        <div
          className="border-[1px] rounded-lg px-5 py-1 hover:cursor-pointer"
          onClick={() => setPreview(false)}
        >
          編輯
        </div>
        <div
          className="border-[1px] rounded-lg px-5 py-1 hover:cursor-pointer"
          onClick={() => setPreview(true)}
        >
          預覽
        </div>
      </div>
      {preview ? (
        <Markdown article={article} />
      ) : (
        <div
          // onSubmit={handleSubmitPostArticle}
          className="flex flex-col gap-2"
        >
          <input
            required
            placeholder="標題"
            className="border-[1px] px-3 py-2"
            value={article.title}
            onChange={(e) =>
              setArticle((prev) => {
                return { ...prev, title: e.target.value };
              })
            }
          />
          <textarea
            required
            className="border-[1px] px-3 py-2"
            onChange={(e) =>
              setArticle((prev) => {
                return { ...prev, content: e.target.value };
              })
            }
            value={article.content}
          />
          <label htmlFor="category">Category</label>
          <select
            required
            id="category"
            name="category"
            onChange={(e) => {
              setArticle((prev) => {
                return { ...prev, category: e.target.value };
              });
            }}
          >
            <option value="frontend">frontend</option>
            <option value="backend">backend</option>
            <option value="iOs">iOs</option>
            <option value="Android">Android</option>
            <option value="data science">data science</option>
          </select>
          <div>
            {article.tags.map((tag, index) => (
              <p key={index}>{tag}</p>
            ))}
            <label htmlFor="tag">Tag : </label>
            <input type="text" ref={tagRef} />
            <button onClick={() => handleAddTag()}>add tag</button>
          </div>

          <button onClick={click}>送出</button>
        </div>
      )}
    </div>
  );
};

export default Page;
