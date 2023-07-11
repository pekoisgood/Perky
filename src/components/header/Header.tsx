"use client";

import Image from "next/image";
import Link from "next/link";
import Profile from "./Profile";
import Search from "./Search";
import { HiOutlineDocumentAdd } from "react-icons/hi";
import logo from "./coding.png";
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";

const Header = () => {
  const { isLogin } = useContext(AuthContext);

  return (
    <div className="fixed w-full top-0 left-0 right-0 bg-white h-[60px] flex items-center px-4 shadow-sm z-50">
      <Link href="/" className="flex items-center gap-2 px-4 py-1 rounded-3xl">
        <Image
          src={logo}
          width={20}
          height={20}
          alt="Perky logo"
          className="text-orange-300"
        />
        <div className="inline-block w-[82px] tracking-[2px]">
          <h1 className="font-bold text-[25px] overflow-hidden animate-typing border-r-[1px] border-black">
            Perky
          </h1>
        </div>
      </Link>
      <div className="w-fit ml-auto flex items-center gap-3">
        <Link href={isLogin ? "/article/postArticle" : ""} className="w-fit">
          <HiOutlineDocumentAdd size={30} />
        </Link>
        <Search />
        <div className="group">
          <Profile />
        </div>
      </div>
    </div>
  );
};

export default Header;
