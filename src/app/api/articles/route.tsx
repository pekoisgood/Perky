import { NextResponse } from "next/server";
import {
  DocumentData,
  collection,
  getDocs,
  orderBy,
  query,
  limit,
  startAfter,
  getDoc,
  doc,
  getCountFromServer,
} from "firebase/firestore";
import { db } from "@/utils/firebase/firebase";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const lastId = searchParams.get("lastId");
  const articleRef = collection(db, "articles");
  const articleCollectionSnapShot = await getCountFromServer(articleRef);

  const data: DocumentData[] = [];

  if (lastId === "0") {
    const first = query(articleRef, orderBy("createdAt", "desc"), limit(10));
    const documentSnapshots = await getDocs(first);
    documentSnapshots.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
  }

  if (lastId !== "0" && lastId) {
    const lastArticle = await getDoc(doc(articleRef, lastId));

    const next = query(
      collection(db, "articles"),
      orderBy("createdAt", "desc"),
      startAfter(lastArticle),
      limit(10)
    );

    const documentSnapshots = await getDocs(next);
    documentSnapshots.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
  }

  return NextResponse.json({
    data: data,
    totalCount: articleCollectionSnapShot.data().count,
  });
}
