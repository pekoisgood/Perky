import { Article } from "@/utils/firebase";
import Link from "next/link";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

export default async function Home() {
  const articlesReq = await fetch(process.env.URL + "/api/articles");
  const articles = await articlesReq.json();

  const categories = [
    "Frontend",
    "Backend",
    "IOS",
    "Android",
    "Leetcode",
    "Others",
  ];

  return (
    <div className="flex h-full w-full">
      <div className="flex flex-col border-2 border-sky-900 w-[180px] h-full items-center gap-2 pt-5">
        {categories.sort().map((category) => {
          return (
            <Link
              href={`/articles/${category}`}
              key={category}
              className="bg-slate-200 py-1 px-3 rounded-2xl w-fit hover:cursor-pointer"
            >
              # {category}
            </Link>
          );
        })}
      </div>
      <div className="border-2 border-sky-900 h-full grow p-3 pt-5 flex flex-col items-center gap-3">
        {articles.map((article: Article) => {
          return (
            <Link
              href={`/article/${article.id}`}
              key={article.id}
              className="border-[1px] border-slate-300 rounded-md w-full px-3 py-1"
            >
              <h2 className="font-bold text-[18px]">{article.title}</h2>
              <p className="bg-slate-200 py-1 px-2 rounded-2xl w-fit text-[12px]">
                {article.category}
              </p>

              <p>{article.authorName}</p>
              <ReactMarkdown>{article.content.slice(0, 50)}</ReactMarkdown>
              <span>...</span>
              <div>
                {article.tags &&
                  article.tags.map((tag: string, index: number) => {
                    return (
                      <p
                        key={index}
                        className="p-1 bg-amber-100 rounded-md w-fit"
                      >
                        {tag}
                      </p>
                    );
                  })}
              </div>
            </Link>
          );
        })}
      </div>
      <div className="border-2 border-sky-900 w-[180px] h-full">
        trending article
      </div>
    </div>
  );
}
