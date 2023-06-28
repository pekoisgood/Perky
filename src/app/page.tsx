import { Article } from "@/utils/firebase";
import Image from "next/image";
import Link from "next/link";
import { headers } from "next/dist/client/components/headers";
import ArticleSnippet from "../components/article/ArticleSnippet";
import TrendingArticles from "./TrendingArticles";

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
      <div className="border-2 border-sky-900 h-full grow p-3 pt-5 flex flex-col gap-3">
        {articles.map((article: Article) => {
          return (
            <Link
              href={`/article/${article.id}`}
              key={article.id}
              className="border-[1px] border-slate-300 rounded-md w-full px-3 py-1 flex justify-between items-center gap-3 min-h-[140px]"
            >
              <div>
                <h2 className="font-bold text-[18px]">{article.title}</h2>
                <p className="bg-slate-200 py-1 px-2 rounded-2xl w-fit text-[12px]">
                  {article.category}
                </p>

                <p>{article.authorName}</p>
                <ArticleSnippet article={article.content} />
                <span>...</span>
                <div className="flex gap-2">
                  {article.tags &&
                    article.tags.map((tag: string, index: number) => {
                      return (
                        <p
                          key={index}
                          className="p-1 bg-amber-100 rounded-md w-fit"
                        >
                          # {tag}
                        </p>
                      );
                    })}
                </div>
              </div>
              <div>
                {article.image && (
                  <div className="w-fit ml-auto">
                    <Image
                      src={article.image}
                      alt="article cover image"
                      width={400}
                      height={200}
                    />
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </div>
      <div className="border-2 border-sky-900 w-[300px] h-full flex flex-col gap-3 p-1">
        <h2>Tredning Articles</h2>
        <TrendingArticles />
      </div>
    </div>
  );
}
