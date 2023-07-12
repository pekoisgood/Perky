import {
  DocumentData,
  collection,
  getDocs,
  orderBy,
  query,
  limit,
  startAfter,
} from "firebase/firestore";
import { db } from "@/utils/firebase";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const paging = Number(searchParams.get("paging"));

  const articleRef = collection(db, "articles");
  // const q = query(articleRef, orderBy("createdAt", "desc"), limit(10));
  // const result = await getDocs(q);
  let data: DocumentData[] = [];

  // result.forEach((doc) => {
  //   data.push({ id: doc.id, ...doc.data() });
  // });
  if (paging === undefined) {
    return NextResponse.json({ message: "No paging provided" });
  }
  if (paging === 0) {
    const first = query(articleRef, orderBy("createdAt", "desc"), limit(10));
    const documentSnapshots = await getDocs(first);
    documentSnapshots.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
  } else {
    const next = query(
      articleRef,
      orderBy("createdAt", "desc"),
      startAfter(10 * paging - 1),
      limit(10)
    );
    const documentSnapshots = await getDocs(next);
    documentSnapshots.forEach((doc) => {
      console.log(doc.data());

      data.push({ id: doc.id, ...doc.data() });
    });
  }

  return NextResponse.json({ data });
}
