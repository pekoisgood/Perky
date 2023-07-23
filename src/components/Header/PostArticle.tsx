"use client";

import React, { useState } from "react";
import Link from "next/link";

import { HiOutlineDocumentAdd } from "react-icons/hi";

import { useAppSelector } from "@/redux/hooks";

import Warning from "../Warning/Warning";
import Button from "../Button/Button";

const PostArticle = () => {
  const [showWarning, setShowWarning] = useState(false);

  const isLogin = useAppSelector((state) => state.auth.value.isLogin);

  return (
    <>
      <Link
        href={isLogin ? "/article/postArticle" : ""}
        className="w-fit"
        onClick={() => {
          !isLogin && setShowWarning(true);
        }}
      >
        <HiOutlineDocumentAdd size={30} />
      </Link>
      {showWarning && (
        <Warning time={0} customHandleCloseButton={() => setShowWarning(false)}>
          <div className="flex flex-col gap-3 items-center">
            <p>You need to login to post a article.</p>
            <Link href="/auth" onClick={() => setShowWarning(false)}>
              <Button>Go to Login</Button>
            </Link>
          </div>
        </Warning>
      )}
    </>
  );
};

export default PostArticle;
