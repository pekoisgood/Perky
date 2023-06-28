import { headers } from "next/dist/client/components/headers";
import Link from "next/link";

interface TrendingArticle {
  title: string;
  authorName: string;
  savedCount: number;
  id: string;
}

const TrendingArticles = async () => {
  const headersData = headers();
  const protocol = headersData.get("x-forwarded-proto");
  const host = headersData.get("host");
  const articlesReq = await fetch(
    protocol + "://" + host + "/api/articles/savedCount"
  );

  const trendingArticles: TrendingArticle[] = await articlesReq.json();

  return (
    <>
      {trendingArticles.map((article: TrendingArticle, index: number) => {
        return (
          <Link
            href={`/article/${article.id}`}
            key={index}
            className="border-[1px] border-slate-600 rounded-lg w-full p-2"
          >
            <h2>{article.title}</h2>
            <p>{article.authorName}</p>
            <p>收藏數 : {article.savedCount}</p>
          </Link>
        );
      })}
    </>
  );
};

export default TrendingArticles;
