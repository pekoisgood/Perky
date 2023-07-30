import ArticleListSkeleton from "@/components/Skeleton/ArticleListSkeleton";
import React from "react";

const loading = () => {
  return (
    <div className="flex flex-col gap-3 w-full">
      <h1 className="mx-auto w-[200px] rounded-lg max-w-full h-[35px] bg-gradient-to-r from-[#eee] via-[#d6d6d6] to-[#eee] bg-[length:400%_400%] animate-skeleton" />
      <div className="flex flex-wrap w-full">
        <ArticleListSkeleton />
        <ArticleListSkeleton />
        <ArticleListSkeleton />
        <ArticleListSkeleton />
        <ArticleListSkeleton />
        <ArticleListSkeleton />
      </div>
    </div>
  );
};

export default loading;
