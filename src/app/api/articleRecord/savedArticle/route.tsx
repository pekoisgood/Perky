import {
  DocumentData,
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "@/utils/firebase";
import { NextResponse } from "next/server";

export async function GET() {
  const articleRef = collection(
    db,
    "users",
    "bGmbmzaDDaO6lbnInODlaCfb4V63",
    "savedArticles"
  );
  const querySavedArticles = query(articleRef, orderBy("createdAt", "desc"));
  const result = await getDocs(querySavedArticles);
  let data: DocumentData[] = [];

  result.forEach((doc) => {
    data.push(doc.data());
  });
  return NextResponse.json(data);
}
