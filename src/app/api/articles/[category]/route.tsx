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

export async function GET(
  req: Request,
  { params }: { params: { category: string } }
) {
  const category = params.category;
  const ref = collection(db, "articles");
  const q = query(
    ref,
    where("category", "==", category),
    orderBy("createdAt", "desc")
  );
  const result = await getDocs(q);
  let data: DocumentData[] = [];

  result.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });
  return NextResponse.json(data);
}
