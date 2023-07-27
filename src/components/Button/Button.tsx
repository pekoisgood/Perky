"use client";

import React from "react";

const Button = ({
  children,
  handleOnClick,
  customLayout,
  id,
}: {
  children: React.ReactNode;
  handleOnClick?: () => Promise<void> | void;
  customLayout?: string;
  id?: string;
}) => {
  return (
    <button
      id={id}
      className={`${
        customLayout && customLayout
      } w-fit bg-orange-100 p-1 mb-[3px]
          border-2 border-orange-300 shadow-orange-300 shadow-[-3px_3px]
          hover:cursor-pointer active:shadow-none active:translate-x-[-2px] active:translate-y-[2px] rounded-lg`}
      onClick={() => {
        if (handleOnClick) {
          handleOnClick();
        }
      }}
    >
      {children}
    </button>
  );
};

export default Button;
