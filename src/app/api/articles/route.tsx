import {
  DocumentData,
  collection,
  getDocs,
  orderBy,
  query,
  limit,
} from "firebase/firestore";
import { db } from "@/utils/firebase";
import { NextResponse } from "next/server";

export const revalidate = "force-cache";

export async function GET() {
  const articleRef = collection(db, "articles");
  const q = query(articleRef, orderBy("createdAt"), limit(10));
  const result = await getDocs(q);
  let data: DocumentData[] = [];

  result.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });
  return NextResponse.json(data);
}
