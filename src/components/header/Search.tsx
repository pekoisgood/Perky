"use client";

import { db } from "@/utils/firebase";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HiSearch } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import Button from "../button/Button";

type SearchOutput = {
  id: string;
  name: string;
};

type Tag = {
  id: string;
  name: string;
};

const Search = () => {
  const [isSearching, setIsSearching] = useState<Boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchResult, setSearchResult] = useState<SearchOutput[]>([]);
  const [tags, setTags] = useState<SearchOutput[]>([]);

  useEffect(() => {
    const getTags = async () => {
      const ref = collection(db, "tags");
      const result = await getDocs(ref);
      const tagsDocs: SearchOutput[] = [];
      result.forEach((doc) => {
        tagsDocs.push({
          id: doc.id,
          name: doc.data().tagName,
        });
      });
      setTags(tagsDocs);
    };
    getTags();
  }, []);

  useEffect(() => {
    const filterTags = () => {
      const result = tags.filter((tag: Tag) =>
        tag.name.toLowerCase().includes(searchInput)
      );
      return result;
    };
    if (searchInput === "") {
      setSearchResult([]);
      return;
    }
    if (tags) {
      const searchOutput = filterTags();
      setSearchResult(searchOutput);
    }
  }, [searchInput, tags]);

  return (
    <div className="group">
      <div
        className="hover:cursor-pointer"
        onClick={() => setIsSearching(true)}
      >
        <HiSearch size={30} />
      </div>
      {isSearching && (
        <div
          className={`w-screen h-screen absolute top-0 left-0 flex flex-col justify-center items-center backdrop-blur-md overscroll-contain`}
        >
          <div className="w-[50vw] max-w-[600px] flex flex-col items-center p-3 rounded-lg border-2 border-black h-[50vh] bg-gradient-to-t from-white to-[#FCF8E8]">
            <button
              onClick={() => setIsSearching(false)}
              className="w-fit ml-auto block"
            >
              <IoClose size={20} />
            </button>
            <div className="flex items-center gap-2 w-[90%]">
              <input
                className="text-[20px] outline-none border-2 w-full border-dashed border-[#245953] rounded-md p-2 h-[35px] focus:border-solid"
                placeholder="what are you looking for...?"
                onChange={(e) => setSearchInput(e.target.value.toLowerCase())}
              />
              <Link
                href={`/articles?search=${searchInput}`}
                onClick={() => setIsSearching(false)}
              >
                <Button customLayout="h-[35px] flex justify-center items-center">
                  <HiSearch size={30} />
                </Button>
              </Link>
            </div>
            <div className="flex flex-col gap-2 w-[90%] justify-start mt-[10px] overflow-scroll overscroll-contain">
              {searchResult.length > 0 &&
                searchResult.map((tag: Tag) => {
                  return (
                    <Link
                      key={tag.id}
                      href={`/articles?tag=${tag.name}`}
                      onClick={() => setIsSearching(false)}
                    >
                      <div className="text-[20px] rounded-xl text-medium py-1 pl-[10px] hover:bg-[#eeeeee30] hover:translate-y-[-2px] hover:duration-75">
                        {tag.name}
                      </div>
                    </Link>
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
