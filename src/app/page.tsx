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
    <div className="flex h-full w-full pt-5 relative overflow-hidden gap-5">
      <div className="hidden sm:flex flex-col w-[150px] items-center gap-5 pt-[60px] fixed top-[50%] left-0 2xl:left-[15%] 2xl:translate-x-[-50%] translate-y-[-50%]">
        {categories.sort().map((category) => {
          return (
            <Link
              href={`/articles?category=${category}`}
              key={category}
              className="bg-[#FFD89C] text-bold font-mono shadow-[-3px_3px] shadow-black py-1 px-3 rounded-2xl w-fit border-2 border-black hover:cursor-pointer hover:animate-wiggle"
            >
              # {category}
            </Link>
          );
        })}
      </div>
      <ArticleList articles={articles} />
      <div className="lg:w-[250px] md:w-[160px] h-full hidden md:flex flex-col gap-5 pt-[60px] items-center mt-4">
        <h2 className="mx-auto bg-[#FFD89C] text-bold font-mono border-2 border-black py-1 px-3 shadow-[-3px_3px] shadow-black rounded-2xl w-fit text-[12px] lg:text-[18px] text-center">
          Tredning Articles
        </h2>
        <TrendingArticles />
      </div>
    </div>
  );
}
