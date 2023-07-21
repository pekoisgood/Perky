"use client";

import { db } from "@/utils/firebase";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HiSearch } from "react-icons/hi";
import Button from "../button/Button";
import Warning from "../warning/Warning";
import { useRouter } from "next/navigation";

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

  const router = useRouter();

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
        onClick={() => {
          setIsSearching(true);
          setSearchInput("");
        }}
      >
        <HiSearch size={30} />
      </div>
      {isSearching && (
        <Warning
          time={0}
          customHandleCloseButton={() => setIsSearching(false)}
          customLayout="fixed top-[50%] right-[50%] translate-x-[50%] translate-y-[-50%] p-10 flex items-center
           rounded-xl bg-[white] text-black w-[50vw] max-w-[600px] h-[50vh] flex flex-col shadow-[-5px_5px_3px] shadow-[#3c3b3b]"
          customBg="fixed top-0 bottom-0 right-0 left-0 w-screen h-screen bg-black/20"
        >
          <div className="flex items-center gap-2 w-[90%]">
            <input
              value={searchInput}
              className="text-[20px] outline-none border-2 w-full border-dashed border-[#245953] rounded-md p-2 h-[35px] focus:border-solid"
              placeholder="what are you looking for...?"
              onChange={(e) => setSearchInput(e.target.value.toLowerCase())}
            />
            <div
              onClick={() => {
                if (!searchInput) return;
                setIsSearching(false);
                router.push(`/articles?search=${searchInput}`);
              }}
            >
              <Button customLayout="h-[35px] flex justify-center items-center">
                <HiSearch size={30} />
              </Button>
            </div>
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
                    <div className="text-[20px] rounded-xl text-medium py-1 pl-[10px] hover:bg-[#245953]/40">
                      {tag.name}
                    </div>
                  </Link>
                );
              })}
          </div>
          {/* </div> */}
        </Warning>
      )}
    </div>
  );
};

export default Search;
