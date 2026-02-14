import React from "react";

import ArticleList from "@/components/Article/ArticleList";
import { headers } from "next/headers.js";

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
      `${category ? category : search ? search : tag}`,
  );
  const articles = await categoryArticlesReq.json();

  return (
    <div className="mt-[60px] flex w-full flex-col items-center justify-center">
      {category && (
        <h2
          className={`text-bold mx-auto w-fit rounded-full border-2 
      border-black bg-[#FFD89C] px-3 py-1 font-mono text-[25px] font-bold tracking-[1px] shadow-[-3px_3px] shadow-black
      `}
        >
          {category}
        </h2>
      )}
      {(search || tag) && (
        <h2
          className={`text-bold mx-auto w-fit rounded-full px-3 
      py-1 font-mono text-[25px] font-bold tracking-[1px]
      `}
        >
          {`搜尋結果 : ${search || tag}`}
        </h2>
      )}
      <div className="flex h-full w-full grow flex-col items-center gap-3 p-3 pt-5">
        {articles.length > 0 ? (
          <ArticleList articles={articles} customLayout="w-full" />
        ) : (
          <p className="mx-auto w-fit text-center font-medium text-[#245953]">
            Found no articles related to {search}...
          </p>
        )}
      </div>
    </div>
  );
};

export default Page;
