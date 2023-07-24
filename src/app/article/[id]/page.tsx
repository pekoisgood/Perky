import Image from "next/image";
import Link from "next/link";
import { headers } from "next/dist/client/components/headers";

import Warning from "@/components/Warning/Warning";
import Button from "@/components/Button/Button";
import { getTime } from "@/utils/date/dateFc";

import Comment from "./Comment";
import SaveCount from "./SaveCount";
import TextEditor from "./TextEditor";
import SaveButton from "./SaveButton";

const Page = async ({ params }: { params: { id: string } }) => {
  const articleId = params.id;

  const headersData = headers();
  const protocol = headersData.get("x-forwarded-proto");
  const host = headersData.get("host");

  const req = await fetch(
    protocol + "://" + host + "/api/getArticle/" + articleId
  );
  const article = await req.json();

  if (!article.content) {
    return (
      <Warning time={0}>
        <div className="flex flex-col gap-3">
          <p className="text-[30px] font-bold">Article not found...</p>
          <Link href="/">
            <Button customLayout="font-medium">Back to home page</Button>
          </Link>
        </div>
      </Warning>
    );
  }

  return (
    <div className="flex w-full max-w-[800px] mx-auto">
      <SaveButton count={article.savedCount ?? 0} articleId={articleId} />
      <div className="grow rounded-lg flex flex-col gap-2 items-center justify-center mx-auto py-10 relative z-10">
        <div className="w-full">
          <h1 className="font-bold text-[24px] sm:text-[30px] w-fit mx-auto tracking-[1px] indent-[1px] text-center">
            {article.title}
          </h1>
        </div>
        <div className="flex gap-3 items-center text-[13px] sm:text-[16px] text-[#245953]">
          <p>{article.authorName}</p>
          <span className="w-[5px] h-[5px] rounded-full bg-[#00000088] " />
          <Link
            href={`/articles?category=${article.category}`}
            className="bg-[#FFD89C] text-black tracking-[1px] px-2 py-1 rounded-3xl w-fit text-[10px] sm:text-[12px] border-2 border-black font-bold"
          >
            {article.category}
          </Link>
          <span className="w-[5px] h-[5px] rounded-full bg-[#00000088] " />
          <p>{getTime(new Date(article.createdAt.seconds * 1000), false)}</p>
        </div>
        <SaveCount articleId={articleId} />
        <div className="w-full h-fit mx-auto overflow-hidden rounded-2xl border-2 border-dashed border-[#245953] shadow-[#245953] shadow-[-7px_7px]">
          {article.image && (
            <Image
              src={article.image}
              alt="cover image of this article"
              width={800}
              height={400}
              priority={true}
              className="w-full h-[500px] object-cover"
            />
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
    </div>
  );
};

export default Page;
