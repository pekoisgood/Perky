import {
  DocumentData,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/utils/firebase";
import { NextResponse } from "next/server";

export async function GET() {
  const articleRef = collection(db, "articles");
  const queryArticles = query(
    articleRef,
    where("authorUserId", "==", "peko123")
  );
  const result = await getDocs(queryArticles);
  let data: DocumentData[] = [];
  result.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });
  return NextResponse.json(data);
}
