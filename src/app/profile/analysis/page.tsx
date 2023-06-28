import LineChart from "./LineChart";
import { Article, BookClub } from "@/utils/firebase";
import { headers } from "next/dist/client/components/headers";

const Page = async () => {
  const headersData = headers();
  const protocol = headersData.get("x-forwarded-proto");
  const host = headersData.get("host");

  const articleRecordReq = await fetch(
    protocol + "://" + host + "/api/analysis/article"
  );
  const articleRecord = await articleRecordReq.json();
  const articleRecourdCreatedTime = articleRecord.map(
    (article: Article) => new Date(article.createdAt.seconds * 1000)
  );

  const bookClubRecordReq = await fetch(
    protocol + "://" + host + "/api/analysis/bookClub"
  );
  const bookClubRecord = await bookClubRecordReq.json();
  const bookClubRecordCreatedTime = bookClubRecord.map(
    (bookClub: BookClub) => new Date(bookClub.time.seconds * 1000)
  );

  return (
    <div>
      <h1 className="w-fit mx-auto text-bold text-[25px] mb-2">學習分析</h1>
      <LineChart
        articleCreatedAtRecord={articleRecourdCreatedTime}
        bookClubTimeRecord={bookClubRecordCreatedTime}
      />
    </div>
  );
};

export default Page;
