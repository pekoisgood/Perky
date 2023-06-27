import TextEditor from "@/components/TextEditor";
import Image from "next/image";
import SaveButton from "./SaveButton";
import Link from "next/link";

const Page = async ({ params }: { params: { id: string } }) => {
  const articleId = params.id;
  const req = await fetch(process.env.URL + "/api/getArticle/" + articleId);
  const article = await req.json();

  return (
    <div className="w-[800px] border-slate-500 border-[1px] rounded-lg flex flex-col gap-2 items-center justify-center mx-auto py-3 mt-[50px]">
      {article.image && (
        <div className="w-full object-cover mx-auto">
          <Image
            src={article.image}
            alt="cover image of this article"
            width={800}
            height={400}
            priority={false}
          />
        </div>
      )}
      <div className="relative w-full">
        <h1 className="text-bold text-[30px] w-fit mx-auto">
          {article.title[0].toUpperCase() + article.title.slice(1)}
        </h1>
        <SaveButton articleId={articleId} />
      </div>
      <p>author: {article.authorName}</p>
      <p>category: {article.category}</p>
      <p>
        發佈時間：{new Date(article.createdAt.seconds * 1000).toLocaleString()}
      </p>
      <p>收藏數：{article.savedCount}</p>
      <div className="w-fit mx-auto">
        <TextEditor article={article.content} />
      </div>
      <div className="flex gap-3">
        {article.tag &&
          article.tag.map((tag: string, index: number) => {
            return (
              <Link
                href={`/articles/${tag}`}
                key={index}
                className="rounded-xl bg-sky-100 p-2"
              >
                {tag}
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default Page;
