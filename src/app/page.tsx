import Link from "next/link";
import Image from "next/image";

import sittingBoy from "@/assets/image/people/boy-sitting-on-legs.svg";
import TrendingArticles from "./TrendingArticles";
import RecentArticles from "./RecentArticles";

const categories = [
  "Frontend",
  "Backend",
  "IOS",
  "Android",
  "Leetcode",
  "Others",
];

const categoryClass = `w-fit bg-[#FFD89C] text-bold font-mono py-1 px-3 text-black
shadow-[-3px_3px] shadow-black rounded-2xl border-2 border-black
`;

const Page = () => {
  return (
    <div className="w-full mx-auto">
      <TrendingArticles />
      <div className="relative max-w-[1280px] mx-[10px] lg:mx-auto border-t-2 border-black mt-[20px]">
        <h2 className="w-fit px-2 py-1 bg-black text-white tracking-[1px] font-medium">
          Recent Articles
        </h2>
        <div className="flex mt-[20px] gap-[20px]">
          <div className="hidden sm:flex flex-col w-[150px] items-center gap-5 mt-[56px] sticky top-[120px] left-0 h-[calc(100vh-120px)] self-start">
            <h2 className={`text-center text-[20px] font-semibold`}>
              Category
            </h2>
            {categories.sort().map((category) => {
              return (
                <Link
                  href={`/articles?category=${category}`}
                  key={category}
                  className={
                    categoryClass +
                    "hover:cursor-pointer hover:animate-wiggle z-10 relative"
                  }
                >
                  {category}
                </Link>
              );
            })}
            <Image
              src={sittingBoy}
              alt="boy sitting on legs"
              width={200}
              height={300}
              priority={true}
              className={`absolute bottom-0 left-0 scale-150 z-0`}
            />
          </div>
          <div className="lg:min-w-[100%-300px] md:min-w-[100%-210px] w-full overflow-hidden">
            <RecentArticles />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
