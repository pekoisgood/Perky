import React from "react";
import Link from "next/link";

import { PiBooksDuotone } from "react-icons/pi";

const BookClub = () => {
  return (
    <Link href="/profile/bookClub">
      <PiBooksDuotone size={30} />
    </Link>
  );
};

export default BookClub;
