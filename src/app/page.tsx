import { Article } from "@/utils/firebase";
import Link from "next/link";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

export default async function Home() {
  const articlesReq = await fetch(process.env.URL + "/api/articles");
  const articles = await articlesReq.json();
  console.log(articles);

  return (
    <div className="pt-[60px] flex h-full w-screen">
      <div className="border-2 border-sky-900 w-[180px] h-full">side bar</div>
      <div className="border-2 border-sky-900 h-full grow p-3 pt-5 flex flex-col items-center gap-3">
        {articles.map((article: Article) => {
          return (
            <Link
              href={`/article/${article.id}`}
              key={article.id}
              className="border-[1px] border-slate-300 rounded-md w-full px-3 py-1"
            >
              <h2 className="font-bold text-[18px]">{article.title}</h2>
              <p>{article.authorName}</p>
              <ReactMarkdown>{article.content.slice(0, 10)}</ReactMarkdown>

              <div>
                {article.tags.length > 0 &&
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
