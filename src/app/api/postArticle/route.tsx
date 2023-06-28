import { NextResponse } from "next/server";
import { db } from "@/utils/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export async function POST(req: Request) {
  const data = await req.json();

  const ref = collection(db, "articles");
  await addDoc(ref, {
    title: data.title,
    content: data.content,
    createdAt: serverTimestamp(),
    tag: data.tags,
    authorName: "Peko",
    authorUserId: "peko123",
    category: data.category,
    image: data.image,
  });

  return new NextResponse("hiiii");
}
