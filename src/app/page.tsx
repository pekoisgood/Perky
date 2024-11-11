import Link from "next/link";
import Image from "next/image";

import sittingBoy from "@/assets/image/people/boy-sitting-on-legs.svg";
import TrendingArticles from "./TrendingArticles";
import RecentArticles from "./RecentArticles";
import Script from "next/script";

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
    <div className="mx-auto w-full">
      {/* Google tag (gtag.js) */}
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_KEY}`}
      />
      <Script id="gtag-tracking-config">
        {` window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments)}
  gtag('js', new Date());

  gtag('config',"${process.env.NEXT_PUBLIC_GA_KEY}")`}
      </Script>
      <TrendingArticles />
      <div className="relative mx-[10px] mt-[20px] max-w-[1280px] border-t-2 border-black lg:mx-auto">
        <h2
          className="w-fit bg-black px-2 
        py-1 font-medium tracking-[1px] text-white"
        >
          Recent Articles
        </h2>
        <div className="mt-[20px] flex gap-[20px]">
          <div className="sticky left-0 top-[120px] mt-[56px] hidden h-[calc(100vh-120px)] w-[150px] flex-col items-center gap-5 self-start sm:flex">
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
                    "relative z-10 hover:animate-wiggle hover:cursor-pointer"
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
              className={`absolute bottom-0 left-[50px] z-0 scale-150`}
            />
          </div>
          <div className="w-full overflow-hidden md:min-w-[100%-210px] lg:min-w-[100%-300px]">
            <RecentArticles />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
