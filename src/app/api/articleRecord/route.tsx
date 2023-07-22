import {
  DocumentData,
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/utils/firebase/firebase";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("id");

  const articleRef = collection(db, "articles");
  const queryArticles = query(
    articleRef,
    where("authorUserId", "==", userId),
    orderBy("createdAt", "desc")
  );
  const result = await getDocs(queryArticles);
  const data: DocumentData[] = [];

  result.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });
  return NextResponse.json(data);
}
