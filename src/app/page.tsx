import Link from "next/link";
import { headers } from "next/dist/client/components/headers";
import TrendingArticles from "./TrendingArticles";
import ArticleList from "./ArticleList";

export default async function Home() {
  const headersData = headers();
  const protocol = headersData.get("x-forwarded-proto");
  const host = headersData.get("host");

  const articlesReq = await fetch(protocol + "://" + host + "/api/articles");
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
    <div className="flex h-full w-full mt-2">
      <div className="flex flex-col border-2 border-sky-900 w-[250px] h-full items-center gap-2 pt-5">
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
      <ArticleList articles={articles} />
      <div className="border-2 border-sky-900 w-[300px] h-full flex flex-col gap-5 p-1">
        <h2>Tredning Articles</h2>
        <TrendingArticles />
      </div>
    </div>
  );
}
