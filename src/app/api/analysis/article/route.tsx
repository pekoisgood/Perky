import { NextResponse } from "next/server";
import { getRecord } from "@/utils/firebase";

export async function GET() {
  const data = await getRecord(
    "articles",
    "authorUserId",
    "==",
    "peko123",
    "createdAt"
  );

  return NextResponse.json(data);
}
