"use client";

import Button from "@/components/Button/Button";
import { redirect } from "next/navigation";
import React from "react";
import computerMan from "@/assets/image/people/computerman.svg";
import mastacheMan from "@/assets/image/people/mastacheMan.svg";
import Image from "next/image";

const NotFound = () => {
  return (
    <div className="relative h-[calc(100vh-60px)] w-full flex flex-col gap-5 items-center justify-center z-10">
      <h2 className="font-bold text-[20px]">
        Oops... Could not find requested page.
      </h2>
      <Button handleOnClick={() => redirect("/")}>Home</Button>
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
