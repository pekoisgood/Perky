"use client";

import Button from "@/components/button/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import spookyMan from "../assets/image/people/spooky-man.svg";

export default function Error({ reset }: { reset: () => void }) {
  const router = useRouter();

  return (
    <div className="relative flex flex-col gap-5 justify-center items-center w-full h-[calc(100vh-60px)] z-10">
      <p className="text-[100px] text-[#245953] font-extrabold font-mono">
        Something went wrong!
      </p>
      <Button handleOnClick={() => reset()}>Try again</Button>
      <Button handleOnClick={() => router.replace("/")}>Go to home page</Button>
      <Image
        src={spookyMan}
        alt="spooky man"
        width={300}
        height={300}
        className="absolute bottom-0 left-[40px]"
      />
    </div>
  );
}
