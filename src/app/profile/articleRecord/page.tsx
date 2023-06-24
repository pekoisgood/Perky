import { Timestamp } from "firebase/firestore";
import Link from "next/link";

type Articles = {
  id: string;
  authorName: string;
  category: string[];
  authorUserId: string;
  content: string;
  createdAt: Timestamp;
  tags: string[];
  title: string;
  starCounts?: number;
};

const Page = async () => {
  const req = await fetch(process.env.URL + "/api/articleRecord");
  const myArticles: Articles[] = await req.json();

  return (
    <div className="relative">
      <h1 className="mx-auto w-fit text-[28px] font-semibold tracking-[6px] indent-[6px] mb-[50px]">
        發文紀錄
      </h1>
      <Link
        href="/article/postArticle"
        className="absolute top-1 right-0 bg-slate-100 rounded-full px-2 py-1"
      >
        我要發文
      </Link>
      <div className="grid grid-cols-2 gap-5">
        {myArticles.map((article) => {
          return (
            <Link
              href={`/article?id=${article.id}`}
              className="border-slate-500 border-[1px] rounded-lg p-3"
              key={article.id}
            >
              <p className="font-semibold text-[18px]">
                {article.title[0].toUpperCase() + article.title.slice(1)}
              </p>
              <p className="text-slate-400 pl-1 text-[12px]">
                {article.content.slice(0, 20)}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Page;
