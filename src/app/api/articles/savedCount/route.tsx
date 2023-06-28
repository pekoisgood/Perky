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
  let data: DocumentData[] = [];
  const q = query(
    collection(db, "articles"),
    orderBy("savedCount", "desc"),
    limit(5)
  );
  const result = await getDocs(q);
  result.forEach((doc) => {
    data.push({
      id: doc.id,
      title: doc.data().title,
      authorName: doc.data().authorName,
      savedCount: doc.data().savedCount,
    });
  });

  return NextResponse.json(data);
}
