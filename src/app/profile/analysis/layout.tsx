import React, { Suspense } from "react";
import Loading from "./loading";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </div>
  );
};

export default layout;
