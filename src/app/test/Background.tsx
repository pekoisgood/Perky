import React from "react";
import BearMan from "./bear-man.svg";
import Image from "next/image";

const Background = () => {
  return (
    <div className="relative">
      <div className="w-screen h-[200vh]">
        <div className="sticky top-0 right-0">
          <Image src={BearMan} alt="e" width={200} />
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Background;
