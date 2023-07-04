import React from "react";

const Button = ({
  children,
  handleOnClick,
}: {
  children: React.ReactNode;
  handleOnClick?: () => Promise<void>;
}) => {
  return (
    <div
      className={`w-fit bg-orange-100 p-1 rounded-lg mb-[3px]
          border-2 border-orange-300 shadow-orange-300 shadow-[-3px_3px]
          hover:cursor-pointer active:shadow-none active:translate-x-[-2px] active:translate-y-[2px]`}
      onClick={() => {
        if (handleOnClick) {
          handleOnClick();
        }
      }}
    >
      {children}
    </div>
  );
};

export default Button;
