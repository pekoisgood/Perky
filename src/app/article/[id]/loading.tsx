import ArticleSkeleton from "@/components/Skeleton/ArticleSkeleton";
import React from "react";

const Loading = async () => {
  return (
    <div className="relative z-10">
      <ArticleSkeleton />
    </div>
  );
};

export default Loading;
