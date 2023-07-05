import React from "react";
import { headers } from "next/dist/client/components/headers";
import ArticleList from "@/app/ArticleList";
import { capitalize } from "@/utils/func";

const Page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const search = searchParams.search;
  const tag = searchParams.tag;
  const category = searchParams.category;
  const headersData = headers();
  const protocol = headersData.get("x-forwarded-proto");
  const host = headersData.get("host");

  const categoryArticlesReq = await fetch(
    protocol +
      "://" +
      host +
      "/api/articles/search?" +
      `${category ? "category" : search ? "search" : "tag"}` +
      "=" +
      `${category ? category : search ? search : tag}`
  );
  const articles = await categoryArticlesReq.json();

  return (
    <div className="flex flex-col justify-center items-center w-full max-w-[850px] mt-[60px]">
      <h2
        className={`text-[25px] tracking-[1px] w-fit mx-auto font-bold 
      bg-[#FFD89C] text-bold font-mono shadow-[-3px_3px] shadow-black py-1 px-3 rounded-2xl border-2 border-black
      `}
      >
        {category && capitalize(category)} {tag && tag}
        {search && `搜尋結果 : ${search}`}
      </h2>
      <div className="h-full grow p-3 pt-5 flex flex-col items-center gap-3">
        {articles && <ArticleList articles={articles} customLayout="w-full" />}
      </div>
    </div>
  );
};

export default Page;
