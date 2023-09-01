"use client";

import Button from "@/components/Button/Button";
import React from "react";
import computerMan from "@/assets/image/people/computerman.svg";
import Image from "next/image";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="relative h-[calc(100vh-60px)] w-full flex flex-col gap-5 items-center justify-center z-10">
      <h2 className="font-bold text-[20px]">
        Oops... Could not find requested page.
      </h2>

      <Link href="/">
        <Button>Home</Button>
      </Link>

      <Image
        src={computerMan}
        alt="man holding computer"
        width={200}
        height={400}
        className="absolute bottom-[10px] right-0 scale-x-flip"
      />
    </div>
  );
};

export default NotFound;
