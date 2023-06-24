import React from "react";

const Page = async ({ searchParams }: { searchParams: any }) => {
  const req = await fetch("http:localhost:3000/api/getArticle");

  return <div>Page: {searchParams.id}</div>;
};

export default Page;
