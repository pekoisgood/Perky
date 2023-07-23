import React from "react";
import { headers } from "next/dist/client/components/headers";
import ArticleList from "@/components/Article/ArticleList";

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
    <div className="flex flex-col justify-center items-center w-full mt-[60px]">
      {category && (
        <h2
          className={`text-[25px] tracking-[1px] w-fit mx-auto font-bold 
      bg-[#FFD89C] text-bold font-mono shadow-[-3px_3px] shadow-black py-1 px-3 rounded-full border-2 border-black
      `}
        >
          {category}
        </h2>
      )}
      {(search || tag) && (
        <h2
          className={`text-[25px] tracking-[1px] w-fit mx-auto font-bold 
      text-bold font-mono py-1 px-3 rounded-full
      `}
        >
          {`搜尋結果 : ${search || tag}`}
        </h2>
      )}
      <div className="h-full w-full grow p-3 pt-5 flex flex-col items-center gap-3">
        {articles.length > 0 ? (
          <ArticleList articles={articles} customLayout="w-full" />
        ) : (
          <p className="text-[#245953] font-medium text-center w-fit mx-auto">
            Found no articles related to {search}...
          </p>
        )}
      </div>
    </div>
  );
};

export default Page;
