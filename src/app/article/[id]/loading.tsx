import React from "react";
import ArticleSkeleton from "@/components/Skeleton/ArticleSkeleton";

const Loading = async () => {
  return (
    <div className="relative z-10">
      <ArticleSkeleton />
    </div>
  );
};

export default Loading;
