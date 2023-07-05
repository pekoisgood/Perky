"use client";

import { db } from "@/utils/firebase";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";
import { RiSearch2Line } from "react-icons/ri";

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
        <RiSearch2Line size={25} />
      </div>
      {isSearching && (
        <div
          className={`w-screen h-screen absolute top-0 left-0 bg-slate-50/40 flex flex-col justify-center items-center`}
        >
          <div className="w-[] flex flex-col gap-4 bg-slate-200 p-3 rounded-lg">
            <button
              onClick={() => setIsSearching(false)}
              className="w-fit text-red-500 ml-auto block"
            >
              close
            </button>
            <div className="flex gap-2">
              <input
                className="border-[1px] border-slate-500 rounded-md p-2"
                onChange={(e) => setSearchInput(e.target.value.toLowerCase())}
              />
              <Link
                href={`/articles?search=${searchInput}`}
                className="bg-slate-500 p-1 rounded-lg"
                onClick={() => setIsSearching(false)}
              >
                search
              </Link>
            </div>
            <div className="flex flex-col gap-3">
              {searchResult.length > 0 &&
                searchResult.map((tag: Tag) => {
                  return (
                    <div key={tag.id} className="border-[1px] border-slate-500">
                      <Link
                        href={`/articles?tag=${tag.name}`}
                        onClick={() => setIsSearching(false)}
                      >
                        {tag.name}
                      </Link>
                    </div>
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
