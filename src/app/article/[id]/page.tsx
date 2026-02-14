import Image from "next/image";
import Link from "next/link";

import Warning from "@/components/Warning/Warning";
import Button from "@/components/Button/Button";
import { getTime } from "@/utils/date/dateFc";

import Comment from "./Comment";
import SaveCount from "./SaveCount";
import TextEditor from "./TextEditor";
import SaveButton from "./SaveButton";
import { headers } from "next/headers.js";

const Page = async ({ params }: { params: { id: string } }) => {
  const articleId = params.id;

  const headersData = headers();
  const protocol = headersData.get("x-forwarded-proto");
  const host = headersData.get("host");

  const req = await fetch(
    protocol + "://" + host + "/api/getArticle/" + articleId,
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
    <div className="mx-auto flex w-fit">
      <SaveButton
        count={article.savedCount ?? 0}
        articleId={articleId}
        savedUsers={article.savedUsers ?? []}
      />
      <div className="relative z-10 mx-auto flex w-full max-w-[800px] grow flex-col items-center justify-center gap-2 rounded-lg py-10">
        <h1 className="mx-auto w-full hyphens-auto break-words text-center indent-[1px] text-[24px] font-bold tracking-[1px] sm:text-[30px]">
          {article.title}
        </h1>
        <div className="flex items-center gap-3 text-[13px] text-[#245953] sm:text-[16px]">
          <p>{article.authorName}</p>
          <span className="h-[5px] w-[5px] rounded-full bg-[#00000088] " />
          <Link
            href={`/articles?category=${article.category}`}
            className="w-fit rounded-3xl border-2 border-black bg-[#FFD89C] px-2 py-1 text-[10px] font-bold tracking-[1px] text-black sm:text-[12px]"
          >
            {article.category}
          </Link>
          <span className="h-[5px] w-[5px] rounded-full bg-[#00000088] " />
          <p>{getTime(new Date(article.createdAt.seconds * 1000), false)}</p>
        </div>
        <SaveCount articleId={articleId} />
        <div className="mx-auto h-fit w-full overflow-hidden rounded-2xl border-2 border-dashed border-[#245953] shadow-[-7px_7px] shadow-[#245953]">
          {article.image && (
            <Image
              src={article.image}
              alt="cover image of this article"
              width={800}
              height={400}
              priority={true}
              className="h-[500px] w-full object-cover"
            />
          )}
        </div>

        <div className="mx-auto mt-8 w-full">
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
