import Image from "next/image";
import Link from "next/link";
import Profile from "./Profile";
import Search from "./Search";
import { MdPostAdd } from "react-icons/md";
import logo from "./coding.png";

const Header = () => {
  return (
    <div className="fixed w-full top-0 left-0 right-0 bg-white h-[60px] flex items-center px-4 z-10 shadow-sm">
      <Link href="/" className="flex items-center gap-2 px-4 py-1 rounded-3xl">
        <Image
          src={logo}
          width={20}
          height={20}
          alt="Perky logo"
          className="text-orange-300"
        />
        <div className="inline-block w-[81px] tracking-[2px]">
          <h1 className="font-bold text-[25px] overflow-hidden animate-typing border-r-[1px] border-black">
            Perky
          </h1>
        </div>
      </Link>
      <div className="w-fit ml-auto flex items-center gap-3">
        <Link href="/article/postArticle" className="w-fit">
          <MdPostAdd size={30} />
        </Link>
        <Search />
        <div className="group relative">
          <Profile />
        </div>
      </div>
    </div>
  );
};

export default Header;
