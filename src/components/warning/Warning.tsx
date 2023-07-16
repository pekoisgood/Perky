"use client";
import React, { useEffect, useRef } from "react";

type Props = {
  children: React.ReactNode | React.JSX.Element;
  customLayout?: string;
  time?: number;
  customCloseButton?: boolean;
};

const Warning = ({
  children,
  customLayout,
  time,
  customCloseButton = false,
}: Props) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const handleCloseWarning = () => {
    ref.current?.classList.add("hidden");
  };
  useEffect(() => {
    if (time !== 0) {
      const timeout = setTimeout(() => {
        ref.current?.classList.add("hidden");
      }, time ?? 3000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, []);

  return (
    <div
      ref={ref}
      className={`fixed top-0 bottom-0 right-0 left-0 w-screen h-screen backdrop-blur-sm z-50`}
    >
      <div
        className={`${customLayout} fixed top-[50%] right-[50%] translate-x-[50%] translate-y-[-50%] p-10 flex items-center justify-center
       border-2 border-black rounded-xl bg-[white] text-black font-bold w-fit h-fit `}
      >
        {!customCloseButton && (
          <span
            className="absolute top-[10px] right-[20px] text-black hover:cursor-pointer"
            onClick={() => handleCloseWarning()}
          >
            x
          </span>
        )}
        {children}
      </div>
    </div>
  );
};

export default Warning;
