const Page = async ({ params }: { params: { id: string } }) => {
  const articleId = params.id;
  const req = await fetch(process.env.URL + "/api/getArticle/" + articleId);
  const article = await req.json();

  return (
    <div className="w-[800px] border-slate-500 border-[1px] rounded-lg flex flex-col gap-2 items-center justify-center mx-auto py-3 mt-[50px]">
      <h1 className="text-bold text-[30px]">
        {article.title[0].toUpperCase() + article.title.slice(1)}
      </h1>
      <p>author: {article.authorName}</p>
      <p>category: {article.category}</p>
      <p>
        發佈時間：{new Date(article.createdAt.seconds * 1000).toLocaleString()}
      </p>
      <p>{article.content}</p>
      <div>
        {article.tag.map((tag: string, index: number) => {
          return <p key={index}>{tag}</p>;
        })}
      </div>
    </div>
  );
};

export default Page;
