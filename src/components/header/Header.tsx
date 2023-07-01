import Image from "next/image";
import Link from "next/link";
import Profile from "./Profile";
import Search from "./Search";

const Header = () => {
  return (
    <div className="fixed w-full top-0 left-0 right-0 h-[60px] flex items-center px-4 z-10">
      <Link href="/" className="flex items-center gap-2">
        <Image src="/" width={20} height={20} alt="Perky logo" />
        <h1 className="font-bold text-[25px]">Perky</h1>
      </Link>
      <div className="w-fit ml-auto flex items-center gap-2">
        <Link href="/article/postArticle">+ 撰寫貼文</Link>
        <Search />
        <div className="group relative border-2 border-sky-400">
          <Profile />
        </div>
      </div>
    </div>
  );
};

export default Header;
