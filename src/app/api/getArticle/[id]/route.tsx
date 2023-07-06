import { NextResponse } from "next/server";
import { db } from "@/utils/firebase";
import { doc, getDoc } from "firebase/firestore";

export const revalidation = "force-cache";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const articleId = params.id;
  const ref = doc(db, "articles", articleId);
  const result = await getDoc(ref);
  const data = result.data();

  return NextResponse.json({ id: result.id, ...data });
}
