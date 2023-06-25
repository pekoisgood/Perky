import LineChart from "./LineChart";
import { Article, BookClub } from "@/utils/firebase";

const Page = async () => {
  const articleRecordReq = await fetch(
    process.env.URL + "/api/analysis/article"
  );
  const articleRecord = await articleRecordReq.json();
  const articleRecourdCreatedTime = articleRecord.map(
    (article: Article) => new Date(article.createdAt.seconds * 1000)
  );

  const bookClubRecordReq = await fetch(
    process.env.URL + "/api/analysis/bookClub"
  );
  const bookClubRecord = await bookClubRecordReq.json();
  const bookClubRecordCreatedTime = bookClubRecord.map(
    (bookClub: BookClub) => new Date(bookClub.time.seconds * 1000)
  );

  return (
    <div>
      <h1>學習分析</h1>
      <LineChart
        articleCreatedAtRecord={articleRecourdCreatedTime}
        bookClubTimeRecord={bookClubRecordCreatedTime}
      />
    </div>
  );
};

export default Page;
