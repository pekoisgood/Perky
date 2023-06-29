"use client";

import { Article, db } from "@/utils/firebase";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import ArticleList from "@/app/ArticleList";
import { capitalize } from "@/utils/func";

const Page = () => {
  const [searchArticles, setSearchArticles] = useState<Article[]>([]);
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const tag = searchParams.get("tag");
  console.log(searchArticles);

  useEffect(() => {
    const ref = collection(db, "articles");

    const getTagArticles = async () => {
      if (!tag) return;
      const capitalizedTag = capitalize(tag);
      console.log(capitalizedTag);

      const q = query(ref, where("tags", "array-contains", capitalizedTag));
      const result = await getDocs(q);
      let articles: Article[] = [];
      result.forEach((doc) => {
        articles.push({
          id: doc.id,
          authorName: doc.data().authorName,
          authorUserId: doc.data().authorUserId,
          content: doc.data().content,
          title: doc.data().title,
          category: doc.data().category,
          tags: doc.data().tags,
          createdAt: doc.data().createdAt,
          image: doc.data().image,
        });
      });

      setSearchArticles(articles);
    };
    const getSearchArticles = async () => {
      if (!search) return;

      const capitalizedSearch = capitalize(search);

      const result = await getDocs(query(ref, orderBy("createdAt", "desc")));
      let articles: Article[] = [];
      result.forEach((doc) => {
        articles.push({
          id: doc.id,
          authorName: doc.data().authorName,
          authorUserId: doc.data().authorUserId,
          content: doc.data().content,
          title: doc.data().title,
          category: doc.data().category,
          tags: doc.data().tags,
          createdAt: doc.data().createdAt,
          image: doc.data().image,
        });
      });
      console.log(capitalizedSearch);

      const filteredArticles = articles.filter(
        (article) =>
          article.title.includes(capitalizedSearch) ||
          article.content.includes(capitalizedSearch) ||
          article.content.includes(capitalizedSearch)
      );

      setSearchArticles(filteredArticles);
    };

    if (tag) {
      getTagArticles();
    }
    if (search) {
      getSearchArticles();
    }
  }, [tag, search]);

  return (
    <div>
      <h1>
        搜尋結果 : {search && capitalize(search)} {tag && capitalize(tag)}
      </h1>
      {searchArticles.length > 0 ? (
        <ArticleList articles={searchArticles} />
      ) : (
        <div>No articles found</div>
      )}
    </div>
  );
};

export default Page;
