import React, { Suspense } from "react";
import Loading from "./loading";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </>
  );
};

export default layout;
