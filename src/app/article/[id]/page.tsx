import TextEditor from "./TextEditor";
import Image from "next/image";
import SaveButton from "./SaveButton";
import Link from "next/link";
import { headers } from "next/dist/client/components/headers";
import Comment from "./Comment";
import { PiFinnTheHumanFill } from "react-icons/pi";
import SaveCount from "./SaveCount";

const Page = async ({ params }: { params: { id: string } }) => {
  const articleId = params.id;

  const headersData = headers();
  const protocol = headersData.get("x-forwarded-proto");
  const host = headersData.get("host");

  const req = await fetch(
    protocol + "://" + host + "/api/getArticle/" + articleId
  );
  const article = await req.json();

  return (
    <div className="w-full max-w-[800px] rounded-lg flex flex-col gap-2 items-center justify-center mx-auto py-10">
      <div className="relative w-full">
        <h1 className="font-bold text-[24px] sm:text-[30px] w-fit mx-auto tracking-[1px] indent-[1px] text-center">
          {article.title}
        </h1>
        <SaveButton count={article.savedCount ?? 0} articleId={articleId} />
      </div>
      <div className="flex gap-3 items-center text-[13px] sm:text-[16px] text-[#245953]">
        <p>{article.authorName}</p>
        <span className="w-[5px] h-[5px] rounded-full bg-[#00000088] " />
        <p className="bg-[#FFD89C] text-black tracking-[1px] px-2 py-1 rounded-3xl w-fit text-[10px] sm:text-[12px] border-2 border-black font-bold">
          {article.category}
        </p>
        <span className="w-[5px] h-[5px] rounded-full bg-[#00000088] " />
        <p>
          {
            new Date(article.createdAt.seconds * 1000)
              .toLocaleString()
              .split(" ")[0]
          }
        </p>
      </div>
      <SaveCount articleId={articleId} />
      <div className="w-full h-fit object-cover mx-auto overflow-hidden rounded-2xl border-2 border-dashed border-[#245953] shadow-[#245953] shadow-[-7px_7px]">
        {article.image !== "" ? (
          <Image
            src={article.image}
            alt="cover image of this article"
            width={800}
            height={400}
            priority={true}
          />
        ) : (
          <PiFinnTheHumanFill size={30} />
        )}
      </div>

      <div className="w-full mx-auto mt-8">
        <TextEditor article={article.content} />
      </div>
      {article.tag && (
        <div className="flex gap-3">
          {article.tag.map((tag: string, index: number) => {
            return (
              <Link
                href={`/articles/${tag}`}
                key={index}
                className="rounded-xl bg-sky-100 p-2"
              >
                {tag}
              </Link>
            );
          })}
        </div>
      )}
      <Comment articleId={article.id} />
    </div>
  );
};

export default Page;
