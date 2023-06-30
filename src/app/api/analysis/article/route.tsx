import { NextResponse } from "next/server";
import { getRecord } from "@/utils/firebase";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("id");
  if (!userId) throw "User not found!";

  const data = await getRecord(
    "articles",
    "authorUserId",
    "==",
    userId,
    "createdAt"
  );

  return NextResponse.json(data);
}
