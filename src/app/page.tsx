import Link from "next/link";
import Image from "next/image";
import { headers } from "next/dist/client/components/headers";
import TrendingArticles from "./TrendingArticles";
import ArticleList from "./ArticleList";
import sittingBoy from "../assets/image/boy-sitting-on-legs.svg";

export const categories = [
  "Frontend",
  "Backend",
  "IOS",
  "Android",
  "Leetcode",
  "Others",
];

export const categoryClass = `w-fit bg-[#FFD89C] text-bold font-mono py-1 px-3 text-black
shadow-[-3px_3px] shadow-black rounded-2xl border-2 border-black
`;

export default async function Home() {
  const headersData = headers();
  const protocol = headersData.get("x-forwarded-proto");
  const host = headersData.get("host");

  const articlesReq = await fetch(protocol + "://" + host + "/api/articles");
  const articles = await articlesReq.json();

  return (
    <div className="w-full pt-5 max-w-[1280px] mx-auto">
      <TrendingArticles />

      <div className="relative border-t-2 border-black mx-3 lg:mx-0">
        <h2 className="w-fit px-2 py-1 bg-black text-white tracking-[1px] font-medium">
          Recent Articles
        </h2>
        <div className="flex mt-[40px] gap-[20px]">
          <div className="hidden sm:flex flex-col w-[150px] items-center gap-5 mt-[56px] sticky top-[120px] left-0 h-[calc(100vh-120px)] self-start">
            <h2 className={`text-center text-[20px] font-semibold`}>
              Category
            </h2>
            {categories.sort().map((category) => {
              return (
                <Link
                  href={`/articles?category=${category}`}
                  key={category}
                  className={
                    categoryClass + " hover:cursor-pointer hover:animate-wiggle"
                  }
                >
                  {category}
                </Link>
              );
            })}
            <Image
              src={sittingBoy}
              alt="boy sitting on legs"
              width={200}
              height={300}
              className={`absolute bottom-0 left-0 scale-150`}
            />
          </div>
          <div className="lg:min-w-[100%-300px] md:min-w-[100%-210px] w-full overflow-hidden">
            {articles.length > 0 ? (
              <ArticleList
                articles={articles}
                customLayout="md:justify-start pl-[0]"
              />
            ) : (
              <div className="w-full bg-orange-50 rounded-xl">Loading...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
