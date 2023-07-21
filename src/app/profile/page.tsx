import UserProfile from "./UserProfile";
import LineChart from "./analysis/LineChart";
import ArticleRecord from "./articleRecord/ArticleRecord";
import TodayBookClub from "./bookClub/TodayBookClub";
import SavedArticle from "./savedArticle/SavedArticle";

const Page = async () => {
  return (
    <div className="h-full w-full flex lg:flex-row flex-col gap-2 overflow-y-scroll pb-[40px] lg:pd-0 px-3">
      <div className="grow flex flex-col gap-2 relative pt-2">
        <div className="grow flex flex-col gap-2">
          <div className="basis-1/2 m-3 bg-white rounded-2xl p-5 shadow-lg flex flex-col items-center overflow-y-scroll">
            <TodayBookClub />
          </div>
          <div className="flex flex-col sm:flex-row basis-1/2 gap-2 md:w-[auto]">
            <div className="basis-1/2 m-3 bg-white rounded-2xl p-5 shadow-lg min-h-[400px]">
              <ArticleRecord />
            </div>
            <div className="basis-1/2 m-3 bg-white rounded-2xl p-5 shadow-lg min-h-[400px]">
              <SavedArticle />
            </div>
          </div>
        </div>
      </div>
      <div className="basis-1/4 flex flex-col gap-2">
        <div className="basis-1/3 flex-col justify-center items-center hidden lg:flex pt-3">
          <UserProfile />
        </div>
        <div className="basis-1/3 px-5 h-full flex mx-auto justify-center items-center lg:max-w-[300px] bg-white rounded-2xl shadow-lg z-10">
          <LineChart />
        </div>
      </div>
    </div>
  );
};

export default Page;
