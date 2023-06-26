import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <div className="fixed w-screen top-0 left-0 h-[60px] bg-slate-200 flex items-center px-4">
      <Link href="/" className="flex items-center gap-2">
        <Image src="/" width={20} height={20} alt="Perky logo" />
        <h1 className="font-bold text-[25px]">Perky</h1>
      </Link>
      <div className="w-fit ml-auto">
        <Link
          href="/profile"
          className="border-2 border-slate-300 rounded-full p-2 flex items-center justify-center"
        >
          <Image src="/" alt="user avatar" width={20} height={20} />
        </Link>
      </div>
    </div>
  );
};

export default Header;
