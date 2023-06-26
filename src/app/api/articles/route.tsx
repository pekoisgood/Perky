import { DocumentData, collection, getDocs } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { NextResponse } from "next/server";

export const revalidate = "force-cache";

export async function GET() {
  const articleRef = collection(db, "articles");
  const result = await getDocs(articleRef);
  let data: DocumentData[] = [];

  result.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });
  return NextResponse.json(data);
}
