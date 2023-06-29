import { NextResponse } from "next/server";
import { db } from "@/utils/firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
} from "firebase/firestore";

export async function POST(req: Request) {
  const data = await req.json();

  const ref = collection(db, "articles");
  // try {
  await addDoc(ref, {
    title: data.title,
    content: data.content,
    createdAt: serverTimestamp(),
    tag: data.tags,
    authorName: data.userName,
    authorUserId: data.userId,
    category: data.category,
    image: data.image,
  });
  // } catch (error: Error) {
  //   return new NextResponse(error);
  // }

  for (let i = 0; i < data.tags.length; i++) {
    console.log(data.tags[i]);

    const tagRef = collection(db, "tags");
    const q = query(tagRef, where("tagName", "==", data.tags[i]));
    const result = await getDocs(q);
    let tag = "";
    result.forEach((doc) => {
      tag = doc.data().tagName;
    });

    if (tag) return;
    await addDoc(collection(db, "tags"), {
      tagName: data.tags[i],
    });
  }

  return new NextResponse("OK");
}
