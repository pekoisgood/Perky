import Link from "next/link";
import { headers } from "next/dist/client/components/headers";
import TrendingArticles from "./TrendingArticles";
import ArticleList from "./ArticleList";

export const categories = [
  "Frontend",
  "Backend",
  "IOS",
  "Android",
  "Leetcode",
  "Others",
];

export default async function Home() {
  const headersData = headers();
  const protocol = headersData.get("x-forwarded-proto");
  const host = headersData.get("host");

  const articlesReq = await fetch(protocol + "://" + host + "/api/articles");
  const articles = await articlesReq.json();

  return (
    <div className="flex h-full w-full pt-5 relative gap-6">
      <div
        className={`sticky top-0 right-0 
        lg:min-w-[300px] md:min-w-[210px] hidden md:flex flex-col h-screen
    pb-[60px] pt-[30px] items-center overflow-y-scroll`}
      >
        <div className="flex flex-col w-[150px] items-center gap-5 mt-[40px]">
          <h2 className={`text-center text-[20px] font-medium`}>類別</h2>
          {categories.sort().map((category) => {
            return (
              <Link
                href={`/articles?category=${category}`}
                key={category}
                className={`w-fit bg-[#FFD89C] text-bold font-mono py-1 px-3 text-black
                shadow-[-3px_3px] shadow-black rounded-2xl border-2 border-black 
                hover:cursor-pointer hover:animate-wiggle`}
              >
                {category}
              </Link>
            );
          })}
        </div>
        <h2 className={`text-center text-[20px] font-medium mt-[60px]`}>
          熱門文章
        </h2>
        <TrendingArticles />
      </div>
      <div className="lg:min-w-[100%-300px] md:min-w-[100%-210px] w-full">
        {articles.length > 0 ? (
          <ArticleList
            articles={articles}
            customLayout="md:justify-start pl-[0] h-[calc(100vh-60px) overflow-y-scroll]"
          />
        ) : (
          <div className="w-full bg-orange-50 rounded-xl">加載中...</div>
        )}
      </div>
    </div>
  );
}
