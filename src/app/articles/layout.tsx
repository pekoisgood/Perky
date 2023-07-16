import React from "react";
import Link from "next/link";

const categories = [
  "Android",
  "Backend",
  "Frontend",
  "iOS",
  "Leetcode",
  "Others",
];

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full w-full max-w-[1280px] mx-auto pt-5 relative">
      <div
        className={`sticky top-0 right-0 
        lg:min-w-[300px] md:min-w-[210px] hidden md:flex flex-col h-screen
    pb-[60px] pt-[30px] items-center overflow-y-scroll`}
      >
        <div className="flex flex-col w-[150px] items-center gap-5 mt-[40px]">
          <h2 className={`text-center text-[20px] font-medium`}>Category</h2>
          {categories.map((category) => {
            return (
              <Link
                href={`/articles?category=${category}`}
                key={category}
                className={`w-fit bg-[#FFD89C] text-bold font-mono py-1 px-3 
                shadow-[-3px_3px] shadow-black rounded-2xl border-2 border-black 
                hover:cursor-pointer hover:animate-wiggle`}
              >
                {category}
              </Link>
            );
          })}
        </div>
      </div>
      <div className="lg:min-w-[100%-300px] md:min-w-[100%-210px] w-full">
        {children}
      </div>
    </div>
  );
};

export default Layout;
