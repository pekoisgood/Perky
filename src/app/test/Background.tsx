import React from "react";
import BearMan from "./bear-man.svg";
import Image from "next/image";

const Background = () => {
  return (
    <div className="relative">
      <div className="w-screen h-screen sticky z-0">
        <div className="sticky top-0 right-0">
          <Image src={BearMan} alt="e" />
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Background;
