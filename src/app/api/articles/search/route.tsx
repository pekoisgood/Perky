import { NextResponse } from "next/server";
import { db } from "@/utils/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  DocumentData,
  orderBy,
} from "firebase/firestore";
import { capitalize } from "@/utils/func";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search");
  const tag = searchParams.get("tag");
  const category = searchParams.get("category");
  let data: DocumentData[] = [];
  const articleRef = collection(db, "articles");

  if (category) {
    const q = query(
      articleRef,
      where("category", "==", capitalize(category)),
      orderBy("createdAt", "desc")
    );
    const result = await getDocs(q);

    result.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
  } else if (tag) {
    const capitalizedTag = capitalize(tag);

    const q = query(
      articleRef,
      where("tags", "array-contains", capitalizedTag)
    );
    const result = await getDocs(q);

    result.forEach((doc) => {
      data.push({
        id: doc.id,
        ...doc.data(),
      });
    });
  } else if (search) {
    const capitalizedSearch = capitalize(search);

    const result = await getDocs(
      query(articleRef, orderBy("createdAt", "desc"))
    );
    result.forEach((doc) => {
      data.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    data = data.filter(
      (article) =>
        article.title.includes(capitalizedSearch) ||
        article.content.includes(capitalizedSearch) ||
        article.content.includes(capitalizedSearch)
    );
  } else {
    return;
  }

  console.log(data);

  return NextResponse.json(data);
}
