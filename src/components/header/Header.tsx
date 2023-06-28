import Image from "next/image";
import Link from "next/link";
import Profile from "./Profile";

const Header = () => {
  return (
    <div className="fixed w-full top-0 left-0 h-[60px] bg-slate-200 flex items-center px-4 z-10">
      <Link href="/" className="flex items-center gap-2">
        <Image src="/" width={20} height={20} alt="Perky logo" />
        <h1 className="font-bold text-[25px]">Perky</h1>
      </Link>
      <div className="mx-auto flex gap-2 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
        <Link href="/bookClubMeeting">讀書會</Link>
        <Link href="/">查看好文</Link>
      </div>
      <div className="w-fit ml-auto flex items-center gap-2">
        <Link href="/article/postArticle">+ 撰寫貼文</Link>
        <p>搜尋</p>
        <Profile />
      </div>
    </div>
  );
};

export default Header;
