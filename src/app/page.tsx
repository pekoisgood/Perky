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
    <div className="flex h-full w-full pt-5 relatve">
      <div className="flex flex-col w-[150px] items-center gap-5 pt-[60px] fixed top-[50%]  left-0 translate-y-[-50%]">
        {categories.sort().map((category) => {
          return (
            <Link
              href={`/articles/${category}`}
              key={category}
              className="bg-[#FFD89C] text-bold shadow-[-3px_3px] shadow-black py-1 px-3 rounded-2xl w-fit hover:cursor-pointer hover:animate-wiggle"
            >
              # {category}
            </Link>
          );
        })}
      </div>
      <ArticleList articles={articles} />
      <div className="w-[230px] pr-2 h-full flex flex-col gap-5 pt-[60px] justify-center fixed top-[50%] right-0 translate-y-[-50%]">
        <h2 className="w-fit mx-auto">Tredning Articles</h2>
        <TrendingArticles />
      </div>
    </div>
  );
}
