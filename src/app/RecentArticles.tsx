"use client";

import { useEffect, useState } from "react";

import ArticleList from "@/components/Article/ArticleList";
import { Article } from "@/utils/types/types";
import ArticleListSkeleton from "@/components/Skeleton/ArticleListSkeleton";

const RecentArticles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isFetching = false;
    let total = 0;
    let articlesCount = 0;
    let lastId = "0";

    const fetchArticles = async () => {
      isFetching = true;
      setIsLoading(true);

      const articlesReq = await fetch(`/api/articles?lastId=${lastId}`);
      const articlesRes = await articlesReq.json();
      total = articlesRes.totalCount;

      setArticles((prev) => {
        return [...prev, ...articlesRes.data];
      });
      articlesCount += articlesRes.data.length;
      lastId = articlesRes.data[articlesRes.data.length - 1].id;
      isFetching = false;
      setIsLoading(false);
    };

    async function scrollHandler() {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 100
      ) {
        if (total && articlesCount === total) return;
        if (isFetching) return;

        fetchArticles();
      }
    }

    fetchArticles();
    if (!window) return;
    window.addEventListener("scroll", scrollHandler);

    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  return (
    <>
      {articles && articles.length > 0 && (
        <ArticleList
          articles={articles}
          customLayout="md:justify-start pl-[0]"
        />
      )}
      {isLoading && (
        <div
          className={`h-full flex flex-wrap gap-8 justify-center min-h-[150px] mt-[10px]`}
        >
          <ArticleListSkeleton />
          <ArticleListSkeleton />
          <ArticleListSkeleton />
          <ArticleListSkeleton />
        </div>
      )}
    </>
  );
};

export default RecentArticles;
