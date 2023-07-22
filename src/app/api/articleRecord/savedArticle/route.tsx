import {
  DocumentData,
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "@/utils/firebase/firebase";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("id");
  if (!userId) return;
  const articleRef = collection(db, "users", userId, "savedArticles");
  const querySavedArticles = query(articleRef, orderBy("createdAt", "desc"));
  const result = await getDocs(querySavedArticles);
  let data: DocumentData[] = [];

  result.forEach((doc) => {
    data.push(doc.data());
  });
  return NextResponse.json(data);
}
