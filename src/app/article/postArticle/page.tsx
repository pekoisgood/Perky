"use client";

import React, { useState } from "react";
import CoverImage from "./CoverImage";
import Form from "./Form";
import Auth from "@/app/profile/Auth";

const Page = () => {
  const [image, setImage] = useState<File | null>(null);

  return (
    <div
      className={`relative flex flex-col w-full max-w-[800px] h-full min-h-[calc(100vh-200px)] bg-white
      gap-7 mx-auto my-[50px] p-5 border-2 border-black rounded-3xl shadow-black shadow-[20px_20px] z-10`}
    >
      <CoverImage image={image} setImage={setImage} />
      <Form image={image} />
      <Auth />
    </div>
  );
};

export default Page;
