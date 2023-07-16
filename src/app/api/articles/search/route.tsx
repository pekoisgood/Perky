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
  console.log(category);

  if (category) {
    const q = query(
      articleRef,
      where("category", "==", category),
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
        article.title.includes(search.toLowerCase()) ||
        article.content.includes(search.toLowerCase()) ||
        article.userName.includes(search.toLowerCase())
    );
  } else {
    return;
  }

  return NextResponse.json(data);
}
