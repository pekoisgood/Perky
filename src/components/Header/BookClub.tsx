import React, { useState } from "react";
import Link from "next/link";

import { PiBooksDuotone } from "react-icons/pi";
import { useAppSelector } from "@/redux/hooks";
import Warning from "../Warning/Warning";
import Button from "../Button/Button";

const BookClub = () => {
  const [showWarning, setShowWarning] = useState(false);

  const isLogin = useAppSelector((state) => state.auth.value.isLogin);
  return (
    <>
      <Link
        href={`${isLogin ? "/profile/bookClub" : ""}`}
        onClick={() => {
          !isLogin && setShowWarning(true);
        }}
        aria-label="Link to book club"
      >
        <PiBooksDuotone size={30} />
      </Link>
      {showWarning && (
        <Warning time={0} customHandleCloseButton={() => setShowWarning(false)}>
          <div className="flex flex-col gap-3 items-center">
            <p>You need to login to join book clubs.</p>
            <Link href="/auth" onClick={() => setShowWarning(false)}>
              <Button>Go to Login</Button>
            </Link>
          </div>
        </Warning>
      )}
    </>
  );
};

export default BookClub;
